function ReportIncident() {
  return (
    <div>
      <h3>Report an incident</h3>
      <form action="" className="flex flex-col gap-8 w-full sm:max-w-md">
        <input type="text" placeholder="Category" />
        <textarea name="" id="" placeholder="Describe your incident"></textarea>
        <input type="text" placeholder="Medial Url" />
        <input type="text" placeholder="Location" />
        <div>
          <button className="cta-primary">Report incident</button>
        </div>
      </form>
    </div>
  );
}

export default ReportIncident;
