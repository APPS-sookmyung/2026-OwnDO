import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8081/api/auth/me', {
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('사용자 정보를 불러오지 못했습니다.');
        }
        return response.json();
      })
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div
      className="container"
      style={{
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* 로그인 상태일 때 상단 우측 로그아웃 링크 */}
      {user && (
        <div style={{ position: 'absolute', top: '24px', right: '32px' }}>
          <a
            href="http://localhost:8081/logout"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 14px',
              borderRadius: '20px',
              backgroundColor: '#f5f2eb',
              border: '1px solid #e0dad1',
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            로그아웃
          </a>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          animation: 'fadeIn 0.8s ease-out forwards',
        }}
      >
        {user ? (
          /* [로그인 완료 상태] */
          <>
            <div style={{ position: 'relative', marginBottom: '36px' }}>
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '-12px',
                  right: '-12px',
                  height: '28px',
                  backgroundColor: '#e6dfd1',
                  zIndex: -1,
                  borderRadius: '8px',
                  opacity: 0.8,
                }}
              />
              <h1
                style={{
                  fontFamily: "'Jua', sans-serif",
                  fontSize: '4.8rem',
                  fontWeight: '400',
                  letterSpacing: '0.03em',
                  color: '#4a3b32',
                  margin: 0,
                  lineHeight: '1.2',
                  wordBreak: 'keep-all',
                }}
              >
                {user.name}님 환영합니다!
              </h1>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <PrimaryButton
                onClick={() => navigate('/record')}
                className="home-start-button"
                style={{
                  backgroundColor: '#3b2210',
                  fontFamily: "'Jua', sans-serif",
                  fontSize: '1.35rem',
                  padding: '20px 56px',
                  borderRadius: '32px',
                  boxShadow: '0 8px 24px rgba(59, 34, 16, 0.28)',
                  cursor: 'pointer',
                  letterSpacing: '0.03em',
                }}
              >
                일상 기록하기
              </PrimaryButton>
            </div>
          </>
        ) : (
          /* [로그인 전 상태] */
          <>
            <div style={{ position: 'relative', marginBottom: '16px' }}>
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
                  fontFamily: "'Jua', sans-serif",
                  fontSize: '6rem',
                  fontWeight: '400',
                  letterSpacing: '0.05em',
                  color: '#4a3b32',
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

            <div
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1.25rem',
                marginBottom: '40px',
                lineHeight: '1.8',
              }}
            >
              <p>거창하지 않아도 괜찮아요.</p>
              <p>오늘을 가볍게 남겨보세요.</p>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <a
                href="http://localhost:8081/oauth2/authorization/google"
                className="home-start-button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '16px 40px',
                  borderRadius: '30px',
                  backgroundColor: '#ffffff',
                  border: '2px solid #e0dad1',
                  color: '#3b2210',
                  fontFamily: "'Jua', sans-serif",
                  fontSize: '1.25rem',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.2s ease',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Google 계정으로 로그인하기
              </a>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
