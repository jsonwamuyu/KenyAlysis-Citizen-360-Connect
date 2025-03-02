function PollCard({
  title,
  description,
  expiry_date,
  option_yes,
  option_no,
  option_not_sure,
}: {
  title: string;
  description: string;
  expiry_date: string;
  option_yes: string;
  option_no: string;
  option_not_sure: string;
}) {
  return (
    <div>
      <h5>{title}</h5>
      <p className="line-clamp-1">{description}</p>
    </div>
  );
}

export default PollCard;
