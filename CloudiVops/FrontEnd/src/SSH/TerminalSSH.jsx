import { useShell } from 'react-ssh2-hook';
/*
const TerminalSSH = () => {
  const { initShell, write } = useShell({
    host: '13.95.105.117',
    port: 22,
    username: 'louaykharouf',
    password: 'PassStudent123',
    onConnect: () => console.log('Connected to SSH'),
    onData: (data) => console.log('Received data:', data),
    onClose: () => console.log('SSH connection closed'),
    onError: (error) => console.error('Error occurred:', error),
  });

  // Call initShell() to establish the SSH connection
  useEffect(() => {
    initShell();
  }, []);

  // Example: Send a command to the remote shell
  const sendCommand = (command) => {
    write(`${command}\n`);
  };

  return (
    // Your component JSX
    <div>
      {/* Example button to send a command */
    /*}
 /*     <button onClick={() => sendCommand('ls')}>Send Command</button>
    </div>
  );
};

export default TerminalSSH;
*/