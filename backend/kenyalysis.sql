-- Create the database
CREATE DATABASE CitizenConnect;
GO

-- Use the database
USE CitizenConnect;
GO

-- Create Roles Table
CREATE TABLE Roles (
    id INT IDENTITY(1,1) PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- Insert default roles
INSERT INTO Roles (role_name) VALUES ('citizen'), ('gvt_official'), ('admin');

-- Create Users Table
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL DEFAULT 1, -- Default role is 'citizen'
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (role_id) REFERENCES Roles(id)
);

-- Create Indexes for Performance
CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_poll_votes ON PollVotes(poll_id, user_id);
CREATE INDEX idx_incident_reports ON IncidentReports(user_id, status);

-- Create Polls Table
CREATE TABLE Polls (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    expiry_date DATETIME NOT NULL,
    created_by INT NOT NULL,
    option_yes INT DEFAULT 0,
    option_no INT DEFAULT 0,
    option_not_sure INT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (created_by) REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT chk_created_by_gvt_official CHECK (created_by IN (SELECT id FROM Users WHERE role_id = (SELECT id FROM Roles WHERE role_name = 'gvt_official')))
);

-- Create PollVotes Table
CREATE TABLE PollVotes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    poll_id INT NOT NULL,
    vote_option VARCHAR(20) NOT NULL CHECK (vote_option IN ('Yes', 'No', 'Not Sure')),
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (poll_id) REFERENCES Polls(id) ON DELETE CASCADE
);

-- Create Incident Reports Table
CREATE TABLE IncidentReports (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Submitted' CHECK (status IN ('Submitted', 'Pending', 'Resolved')),
    media_url VARCHAR(255),
    location VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Restrict Incident Status Updates to 'gvt_official'
CREATE TRIGGER trg_UpdateIncidentStatus
ON IncidentReports
AFTER UPDATE
AS
BEGIN
    IF EXISTS (
        SELECT 1 FROM inserted i
        JOIN Users u ON i.user_id = u.id
        WHERE i.status IN ('Pending', 'Resolved') AND u.role_id != (SELECT id FROM Roles WHERE role_name = 'gvt_official')
    )
    BEGIN
        RAISERROR ('Only government officials can update incident status.', 16, 1);
        ROLLBACK;
    END
END;

-- Create User Feedback Table
CREATE TABLE UserFeedback (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    poll_id INT NOT NULL,
    feedback_text TEXT NOT NULL,
    ai_summary TEXT,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (poll_id) REFERENCES Polls(id) ON DELETE CASCADE
);

-- Procedure to Update Poll Vote Counts
CREATE PROCEDURE UpdatePollVoteCounts
    @poll_id INT, @vote_option VARCHAR(20)
AS
BEGIN
    IF @vote_option = 'Yes'
        UPDATE Polls SET option_yes = option_yes + 1 WHERE id = @poll_id;
    ELSE IF @vote_option = 'No'
        UPDATE Polls SET option_no = option_no + 1 WHERE id = @poll_id;
    ELSE IF @vote_option = 'Not Sure'
        UPDATE Polls SET option_not_sure = option_not_sure + 1 WHERE id = @poll_id;
END;

-- Procedure to Auto-Escalate Incidents
CREATE PROCEDURE AutoEscalateIncidents
AS
BEGIN
    UPDATE IncidentReports
    SET status = 'Pending'
    WHERE status = 'Submitted' AND DATEDIFF(DAY, created_at, GETDATE()) > 3;
END;

-- Schedule the AutoEscalateIncidents procedure to run daily
EXEC msdb.dbo.sp_add_job @job_name = 'AutoEscalateIncidentsJob';
EXEC msdb.dbo.sp_add_jobstep @job_name = 'AutoEscalateIncidentsJob',
    @step_name = 'Auto Escalate Incidents',
    @subsystem = 'TSQL',
    @command = 'EXEC CitizenConnect.dbo.AutoEscalateIncidents';
EXEC msdb.dbo.sp_add_schedule @schedule_name = 'DailyMidnight',
    @freq_type = 4,
    @freq_interval = 1,
    @active_start_time = 000000;
EXEC msdb.dbo.sp_attach_schedule @job_name = 'AutoEscalateIncidentsJob', @schedule_name = 'DailyMidnight';
EXEC msdb.dbo.sp_add_jobserver @job_name = 'AutoEscalateIncidentsJob';
