import styles from '../styles/JoinPage.module.css';

const JoinPage = () => {

  return (
    <div className={styles.CenteredForm}>
      <div className={styles.CenteredFormBox}>
        <h1>Join</h1>
        <form action>
          <label>Display Name</label>
          <input type="text" name="username" placeholder="Display name" required />
          <label>Room</label>
          <input type="text" name="room" placeholder="Room" required/>
          <button>Join</button>
        </form>
      </div>
    </div>
  );
};

export default JoinPage;