import moment from 'moment';

const Message = ({body, time}) => {
  time = moment(time).format('h:mm a');
  return (
    <div>
      <p>{time} - {body}</p>
    </div>
  );
};

export default Message;