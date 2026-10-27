import React, { useRef, useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { EMOTIONS } from '../constants/emotions';

const CardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const backCardRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const recordData = location.state?.recordData;

  if (!recordData) {
    return <Navigate to="/" replace />;
  }

  const emotionData = EMOTIONS.find(e => e.id === recordData.emotion);
  const colors = emotionData.colors;
  const aiMessage =
  recordData.reinterpretedText ??
  recordData.mindCard?.reinterpretedText ??
  emotionData?.aiMessage ??
  '';

  const tags =
  recordData.keywords ??
  recordData.mindCard?.keywords ??
  emotionData?.tags ??
  [];
  const formattedDate = new Date(recordData.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\. /g, '.').slice(0, -1); // formats to YYYY.MM.DD

  const handleDownload = async (e) => {
    e.stopPropagation(); // Prevent card flip when clicking button
    if (!backCardRef.current) return;
    try {
      const canvas = await html2canvas(backCardRef.current, {
        scale: 2,
        backgroundColor: colors.gradientEnd,
        logging: false,
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `owndo-record-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to save image:', error);
      alert('이미지 저장에 실패했습니다.');
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    alert('익명 피드 공유 기능은 준비 중입니다!');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: 'var(--bg-color)',
        perspective: '1000px', // Required for 3D effect
      }}
    >
      {/* Top Nav */}
      <div style={{ position: 'absolute', top: '32px', left: '32px', display: 'flex', gap: '12px', zIndex: 10 }}>
        <button
          onClick={() => navigate('/')}
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            padding: '10px 20px',
            borderRadius: '99px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            transition: 'all 0.2s',
            cursor: 'pointer',
            border: 'none',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
          }}
        >
          ← 홈으로 가기
        </button>
        <button
          onClick={() => navigate('/calendar')}
          style={{
            color: 'var(--primary-color)',
            fontSize: '1rem',
            fontWeight: '600',
            padding: '10px 20px',
            borderRadius: '99px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            transition: 'all 0.2s',
            cursor: 'pointer',
            border: '1px solid var(--primary-color)',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
          }}
        >
          내 기록 모아보기 📅
        </button>
      </div>

      {/* Helper text */}
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', animation: 'fadeIn 1s' }}>
        카드를 클릭해서 뒤집어보세요!
      </p>

      {/* Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '600px', // Fixed height for flip container to work smoothly
          position: 'relative',
          transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          cursor: 'pointer',
        }}
      >
        {/* Front Side (Positive AI Message) */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
            borderRadius: '24px',
            padding: '48px 40px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ 
              color: 'rgba(255,255,255,0.95)', 
              fontSize: '1.4rem', 
              fontWeight: '400', 
              lineHeight: '1.7', 
              wordBreak: 'keep-all',
              whiteSpace: 'pre-wrap',
              maxHeight: '320px',
              overflowY: 'auto',
              fontFamily: "'Pretendard', sans-serif",
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {aiMessage}
            </h3>
            
            <p style={{ 
              marginTop: '40px', 
              color: 'rgba(255,255,255,0.8)', 
              fontSize: '1.1rem', 
              letterSpacing: '0.05em' 
            }}>
              {formattedDate}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: 'auto' }}>
            {tags.map(tag => (
              <span key={tag} style={{
                backgroundColor: 'rgba(255,255,255,0.85)',
                color: colors.mainText,
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>
                #{tag.replace(/^#/, '')}
              </span>
            ))}
          </div>
        </div>

        {/* Back Side (MY DAILY RECORD) */}
        <div
          ref={backCardRef}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
            borderRadius: '24px',
            padding: '48px 40px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              fontSize: '1.4rem',
              fontWeight: '600',
              letterSpacing: '0.05em',
              color: colors.mainText,
              marginBottom: '40px',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            MY DAILY RECORD
          </h2>

          <div style={{ position: 'relative', paddingLeft: '32px', marginBottom: '60px', flex: 1 }}>
            {/* Vertical Line */}
            <div
              style={{
                position: 'absolute',
                left: '7px',
                top: '12px',
                bottom: '0',
                width: '2px',
                backgroundColor: colors.accent,
                opacity: 0.5,
              }}
            />
            {/* Node */}
            <div
              style={{
                position: 'absolute',
                left: '0',
                top: '10px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                border: `2px solid ${colors.accent}`,
                backgroundColor: colors.gradientStart,
                zIndex: 1,
              }}
            />
            <h4
              style={{
                margin: '0 0 16px 0',
                fontSize: '1.1rem',
                color: colors.subText,
                fontWeight: '600',
              }}
            >
              내가 남긴 조각:
            </h4>
            <div
              style={{
                fontSize: '1.3rem',
                color: colors.mainText,
                lineHeight: '1.7',
                fontFamily: "'Jua', sans-serif",
                wordBreak: 'keep-all',
                whiteSpace: 'pre-wrap',
                maxHeight: '260px',
                overflowY: 'auto',
              }}
            >
              "{recordData.content}"
            </div>
          </div>

          {/* Action Buttons */}
          <div
            data-html2canvas-ignore
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-start',
              marginTop: 'auto',
            }}
          >
            <button
              onClick={handleDownload}
              style={{
                padding: '12px 20px',
                borderRadius: '999px',
                border: `1px solid ${colors.accent}`,
                backgroundColor: 'rgba(255,255,255,0.3)',
                color: colors.mainText,
                fontSize: '0.95rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background-color 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.6)')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.3)')}
            >
              <span role="img" aria-label="save">💾</span> 이미지 저장 (.png)
            </button>

            <button
              onClick={handleShare}
              style={{
                padding: '12px 20px',
                borderRadius: '999px',
                border: `1px solid ${colors.accent}`,
                backgroundColor: 'rgba(255,255,255,0.3)',
                color: colors.mainText,
                fontSize: '0.95rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background-color 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.6)')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.3)')}
            >
              <span role="img" aria-label="link">🔗</span> 공유하기
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CardPage;
