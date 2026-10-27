import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EMOTIONS } from '../constants/emotions';

const CalendarPage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [records, setRecords] = useState([]);

  useEffect(() => {
  const fetchRecords = async () => {
    try {
      const response = await fetch(
        'http://localhost:5173/api/mind-cards'
      );

      if (!response.ok) {
        throw new Error('마인드카드 조회 실패');
      }

      const data = await response.json();

      setRecords(
        data.map(record => ({
          ...record,
          date: record.createdAt
        }))
      );
    } catch (e) {
      console.error('기록 조회 오류:', e);
    }
  };

  fetchRecords();
}, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay();
  
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const blanks = Array.from({ length: firstDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Find record for a specific day
  const getRecordForDay = (day) => {
    // Format target date as YYYY-MM-DD
    const targetDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    // Find the latest record for this day
    const dayRecords = records.filter(r => r.date.startsWith(targetDateStr));
    return dayRecords.length > 0 ? dayRecords[dayRecords.length - 1] : null;
  };

  const handleDayClick = async (day) => {
  const targetDateStr =
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  try {
    const response = await fetch(
      `http://localhost:5173/api/mind-cards/date/${targetDateStr}`
    );

    if (!response.ok) {
      throw new Error('날짜별 기록 조회 실패');
    }

    const dayRecords = await response.json();

    if (dayRecords.length === 0) {
      return;
    }

    const record = {
      ...dayRecords[0],
      date: dayRecords[0].createdAt
    };

    navigate('/card', {
      state: { recordData: record }
    });
  } catch (e) {
    console.error('날짜별 기록 조회 오류:', e);
  }
};

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'var(--bg-color)', padding: '24px', animation: 'fadeIn 0.5s ease-out' }}>
      <button
        onClick={() => navigate('/')}
        style={{ position: 'absolute', top: '32px', left: '32px', color: 'var(--text-secondary)', padding: '8px 16px', borderRadius: '99px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
      >
        ← 홈으로 가기
      </button>

      <div style={{ maxWidth: '800px', width: '100%', marginTop: '60px' }}>
        {/* Calendar Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <button onClick={prevMonth} style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}>&lt;</button>
          <h2 style={{ fontSize: '2rem', fontWeight: '600', color: 'var(--text-primary)' }}>
            {year}년 {month + 1}월
          </h2>
          <button onClick={nextMonth} style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}>&gt;</button>
        </div>

        {/* Days of Week */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px', marginBottom: '16px' }}>
          {['일', '월', '화', '수', '목', '금', '토'].map(d => (
            <div key={d} style={{ textAlign: 'center', color: 'var(--text-secondary)', fontWeight: '500' }}>{d}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px' }}>
          {blanks.map(b => (
            <div key={`blank-${b}`} style={{ aspectRatio: '1/1' }} />
          ))}
          {days.map(day => {
            const record = getRecordForDay(day);
            const emotionData = record ? EMOTIONS.find(e => e.id === record.emotion) : null;
            const bg = emotionData ? `linear-gradient(135deg, ${emotionData.colors.gradientStart}, ${emotionData.colors.gradientEnd})` : '#fff';
            
            return (
              <div
                key={day}
                onClick={() => handleDayClick(day)}
                style={{
                  aspectRatio: '1/1',
                  background: bg,
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: record ? 'pointer' : 'default',
                  position: 'relative',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (record) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (record) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.04)';
                  }
                }}
              >
                <span style={{ position: 'absolute', top: '8px', left: '12px', fontSize: '0.9rem', fontWeight: '500', color: record ? emotionData.colors.mainText : 'var(--text-secondary)' }}>
                  {day}
                </span>
                {emotionData && (
                  <span style={{ fontSize: '2.5rem', marginTop: '12px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}>
                    {emotionData.emoji}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CalendarPage;
