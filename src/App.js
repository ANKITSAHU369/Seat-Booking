import './App.css';
import React, { useEffect, useState } from "react";

const App =()=>{

  const [value, setValue] = useState()

  // const [maxSeatsInARow, setMaxSeatsInARow] = useState(7)
  // const [maximumNoOfRow, setMaximumNoOfRow] = useState(11)
  const maxSeatsInARow = 7
  const maximumNoOfRow = 11


  const [seats, setSeats] = useState([])
  const [seatsInRow, setSeatsInRow] = useState([])
  const [emptyCount, setEmptyCount] = useState([])

  const setInitialData = () => {
    // Initializing Seats
    let tempSeats = []
    for(let row = 0; row < maximumNoOfRow; row++){
      tempSeats[row] = []
      for(let seat = 0; seat < maxSeatsInARow; seat++){
        tempSeats[row].push(false);
      }
    }
    // Initializing Last Row (To make seat count 83)
    tempSeats[tempSeats?.length] = []
    for(let row = 0; row < 3; row++){
      tempSeats[tempSeats?.length-1].push(false)
    }
    setSeats(tempSeats)

    // Initializing Empty Seat Count
    let tempEmptySeats = []
    for(let row = 0; row < maximumNoOfRow; row++){
      tempEmptySeats.push(maxSeatsInARow)
    }
    // Last Row
    tempEmptySeats.push(3)
    setEmptyCount(tempEmptySeats)
    setSeatsInRow(tempEmptySeats)
  }

  useEffect(()=>{
    setInitialData()
  },[])

   const getTotalSeatsLeft = () => {
    let seatsLeftCount = 0;
    emptyCount?.forEach((seatsLeftInThisRow) => seatsLeftCount += seatsLeftInThisRow)
    return seatsLeftCount;
  }

  const bookSeatsInSameRow = (value) => {
    let isSeatBookedInSameRow = false;
    for (let row = 0; row < seats?.length; row++) {
      if (emptyCount[row] >= value) {
        isSeatBookedInSameRow = true;
        let seatsLeftToBook = value;
        let seatsLeftInThisRow = emptyCount[row]
        let seatsInThisRow = seatsInRow[row]
        let tempEmptyCount = [...emptyCount]
        tempEmptyCount[row] = tempEmptyCount[row] - value
        let tempSeats = [...seats]
        while (seatsLeftToBook > 0) {
          let currentSeatIndex = seatsInThisRow-seatsLeftInThisRow
          tempSeats[row][currentSeatIndex] = true;
          seatsLeftToBook--;
          seatsLeftInThisRow--;
        }
        setSeats(tempSeats)
        setEmptyCount(tempEmptyCount)
        break;
      }
    }
    !isSeatBookedInSameRow && bookSeatsAmongRemainingSeats(value)
  }

  const bookSeatsAmongRemainingSeats = (value) => {
    if (getTotalSeatsLeft() >= value) {
      let seatsLeftToBook = value;
      let tempSeats = [...seats];
      let tempEmptyCount = [...emptyCount]
      for (let row = 0; row < seats?.length; row++) {
        for (let seat = 0; seat < seats[row]?.length; seat++) {
          if (!tempSeats[row][seat]) {
            tempSeats[row][seat] = true;
            seatsLeftToBook--
            tempEmptyCount[row]--;
          }
          if (!seatsLeftToBook) break
        }
        if (!seatsLeftToBook) break
      }
      setSeats(tempSeats)
      setEmptyCount(tempEmptyCount)
    }
  }

  const handleBookSeats = () => {
    const numValue = Number(value)
    const totalSeatsLeft = getTotalSeatsLeft();
    
    if(!numValue){
      alert(
        `Only numbers are allowed!`
      )
      setValue('')
      return
    }else if (numValue > maxSeatsInARow) {
      alert(
        `Values greater than ${maxSeatsInARow} are not allowed!`
      )
      setValue('')
      return
    }else if(totalSeatsLeft === 0){
      alert(
        `Sorry! All the seats are already booked.`
      )
      setValue('')
      return
    }else if(value > totalSeatsLeft){
      alert(
        `Sorry! Only ${totalSeatsLeft} seats are left.`
      )
      setValue('')
      return
    }
    setValue('')
    bookSeatsInSameRow(numValue)
  }

  return(
    <div style={{display:"flex",justifyContent:"center"}}>
      <div>
        <h1>Seat-Booking <img alt="Seat" src='https://www.pngkit.com/png/full/301-3016415_flight-of-stairs-icons-download-for-free-at.png' width={"40px"} height={"40px"}/> </h1>
        <input value={value} type='text' placeholder='Enter Number' onChange={(e) => setValue(e.target.value)} />
        <button className='bookButton'  onClick={() => handleBookSeats()}>Book</button>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {
            seats?.map((i, index_i) =>
              <div key={index_i} style={{ display: 'flex', flexDirection: 'row' }}>
                {i?.map((j, index_j) =>
                  <div key={index_j} className='seatStyle' style={{ background: j ? 'green' : 'silver'}} >{`${index_i+1}${index_j+1}`}</div>
                )}
              </div>
            )
          }
        </div>
      </div>
      <button onClick={()=>setInitialData()} className="resetButton"> RESET </button>
  </div>
  )
        }

        export default App;