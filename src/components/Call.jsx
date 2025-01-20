const Call = ({data}) => {
  const {id, created_at, direction, from, to, via, duration, is_archived, call_type} = data;

  return (
    <li>
      {call_type} call from {from}
      {direction}
      {duration}
    </li>
  );
};

export default Call;
