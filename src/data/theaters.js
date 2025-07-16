const theaters = [
  {
    id: "inox-mumbai",
    name: "INOX: R-City Mall, Mumbai",
    shows: [
      {
        time: "10:00 AM",
        date: "2025-07-17",
        seats: generateSeats()
      },
      {
        time: "02:00 PM",
        date: "2025-07-17",
        seats: generateSeats()
      }
    ]
  },
  {
    id: "cinepolis-mumbai",
    name: "Cinepolis: Andheri West, Mumbai",
    shows: [
      {
        time: "11:30 AM",
        date: "2025-07-17",
        seats: generateSeats()
      },
      {
        time: "03:00 PM",
        date: "2025-07-17",
        seats: generateSeats()
      }
    ]
  }
];

// Function to generate seat matrix with booked, available, and reserved seats
function generateSeats() {
  const seats = [];
  const rows = "ABCDEFGHIJ";
  for (let row of rows) {
    for (let num = 1; num <= 12; num++) {
      const seatId = `${row}${num}`;
      const rand = Math.random();
      let status = "available";
      if (rand < 0.1) status = "booked";
      else if (rand < 0.15) status = "reserved";
      seats.push({ id: seatId, status });
    }
  }
  return seats;
}

export default theaters;
