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
    <div className="bg-gray-100 rounded-sm border-gray-200 border-[1px] p-2.5 hover:bg-white">
      <h5>{title}</h5>
      <p className="line-clamp-1">{description}</p>
      <div>
        <select name="" id="">
          <option value="Yes">YES</option>
          <option value="NO">NO</option>
          <option value="Not Sure">NOT SURE</option>
        </select>
      </div>
    </div>
  );
}

export default PollCard;
