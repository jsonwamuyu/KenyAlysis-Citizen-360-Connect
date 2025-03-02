import { governmentAnnouncementData } from "../../utils";
import AnnouncementCard from "./AnnouncementCard";
function GovernmentAnnouncements() {
  return (
    <div className="w-full mb-24">
      <div className="container" id="announcements">
        <h4>Government Announcements</h4>

        <div className="flex flex-col gap-4">
          {governmentAnnouncementData.map((announcement) => {
            return <AnnouncementCard key={announcement.id} {...announcement} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default GovernmentAnnouncements;
