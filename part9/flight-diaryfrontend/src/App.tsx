import { useState, useEffect } from 'react'
import { DiaryEntry, Weather, Visibility } from './types'
import { getAllDiaries, createDiary } from './diaryService';
function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
    useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])
    useEffect(() => {
      if (error) {
        const timer = setTimeout(() => setError(''), 5000);
        return () => clearTimeout(timer);
      }
      return undefined;
    }, [error]);
  const weatherOptions = Object.values(Weather);
  const visibilityOptions = Object.values(Visibility);

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary({date, weather, visibility, comment}).then(data => {
      setDiaries(diaries.concat(data))
    })
    .catch(error => {
      const errorMessage = error.response?.data || error.message;
      setError(errorMessage);
      console.log(errorMessage);
    })
    setDate('');
    setWeather(Weather.Sunny);
    setVisibility(Visibility.Great);
    setComment('');
  }

  const Notification = ({ message }: { message: string }) => {
    if (!message) {
      return null;
    }
    return (
      <div style={{ color: 'red', marginBottom: '10px', marginTop: '10px', fontFamily: 'Sans-serif' }}>
        {message}
      </div>
    );
  }
  return (
    <div>
      <h2>Add New Entry</h2>
      <Notification message={error} />
      <form onSubmit={addDiary}>
        <div>
          <strong>Weather:</strong>
          {weatherOptions.map((w) => (
            <label key={w} style={{ marginRight: '10px' }}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w as Weather)}
              />
              {w}
            </label>
          ))}
        </div>
        <div>
          <strong>Visibility:</strong>
          {visibilityOptions.map((v) => (
            <label key={v} style={{ marginRight: '10px' }}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v as Visibility)}
              />
              {v}
            </label>
          ))}
        </div>
        Date: <input value={date} type="date" onChange={(event) => setDate(event.target.value)}/><br/>
        Comment: <input value={comment} onChange={(event) => setComment(event.target.value)}/><br/>
        <button type='submit'>add</button>
      </form>
    <div>
      <h2>Diary Entries</h2>
      {diaries.map(entry => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
            <h4>Weather: {entry.weather}</h4>
            <h4>Visibility: {entry.visibility}</h4>
            <h4>{entry.comment}</h4>
        </div>
      ))}
  </div>
</div>
  )
}

export default App
