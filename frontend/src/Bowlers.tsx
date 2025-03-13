import { useEffect, useState } from 'react';
import { bowler } from './types/bowler';

function Bowlers() {
  const [bowlers, setBowlers] = useState<bowler[]>([]);

  useEffect(() => {
    const fetchBowlers = async () => {
      const response = await fetch('https://localhost:5000/Bowlers');
      const data = await response.json();
      setBowlers(data);
    };
    fetchBowlers();
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Bowler First Name</td>
            <td>Bowler Middle Initial</td>
            <td>Bowler Last Name</td>
            <td>Team Name</td>
            <td>Address</td>
            <td>City</td>
            <td>State</td>
            <td>Zip Code</td>
            <td>Phone Number</td>
          </tr>
        </thead>
        <tbody>
          {bowlers.map((b) => (
            <tr key={b.bowlerId}>
              <td>{b.bowlerFirstName}</td>
              <td>{b.bowlerMiddleInit}</td>
              <td>{b.bowlerLastName}</td>
              <td>{b.teamName}</td>
              <td>{b.bowlerAddress}</td>
              <td>{b.bowlerCity}</td>
              <td>{b.bowlerState}</td>
              <td>{b.bowlerZip}</td>
              <td>{b.bowlerPhoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Bowlers;
