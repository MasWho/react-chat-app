import moment from 'moment';
import styles from '../styles/Message.module.css';

const Message = ({body, time}) => {

  time = moment(time).format('h:mm a');

  return (
    <div className={styles.Message}>
      <p>
        <span className={styles.MessageName}>Some User Name</span>
        <span className={styles.MessageMeta}>{time}</span>
      </p>
      <p>{body}</p>
    </div>
  );
};

export default Message;