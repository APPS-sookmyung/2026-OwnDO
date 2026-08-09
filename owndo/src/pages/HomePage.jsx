import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          animation: 'fadeIn 0.8s ease-out forwards',
        }}
      >
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          {/* Subtle highlight behind the title to make it pop warmly */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '-10px',
              right: '-10px',
              height: '30px',
              backgroundColor: '#e6dfd1',
              zIndex: -1,
              borderRadius: '8px',
              opacity: 0.8,
            }}
          />
          <h1
            style={{
              fontFamily: "'Jua', sans-serif", // Round and catchy font for the title
              fontSize: '6rem',
              fontWeight: '400',
              letterSpacing: '0.05em',
              color: '#4a3b32', // Warm dark brownish color
              margin: 0,
              lineHeight: '1',
            }}
          >
            OWNDO
          </h1>
        </div>
        
        <h2
          style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            lineHeight: '1.3',
            marginBottom: '8px',
          }}
        >
          당신의 하루는 어떤가요?
        </h2>
        
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '40px', lineHeight: '1.8' }}>
          <p>거창하지 않아도 괜찮아요.</p>
          <p>오늘을 가볍게 남겨보세요.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <PrimaryButton onClick={() => navigate('/record')} className="home-start-button" style={{ backgroundColor: '#3b2210', fontFamily: "'Jua', sans-serif", fontSize: '1.2rem', padding: '16px 40px' }}>
            일상 기록하기
          </PrimaryButton>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
