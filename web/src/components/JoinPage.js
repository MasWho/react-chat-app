import styles from '../styles/JoinPage.module.css';

const JoinPage = () => {
  return (
    <div className={styles.CenteredForm}>
      <div className={styles.CenteredFormBox}>
        <h1>Join</h1>
        {/* Redirect to /chat endpoint with query params on submit */}
        <form action={`/chat`}>
          <label>Display Name</label>
          <input type="text" name="username" placeholder="Display name" required />
          <label>Room</label>
          <input type="text" name="room" placeholder="Room" required/>
          <button type="submit">Join</button>
        </form>
      </div>
    </div>
  );
};

export default JoinPage;