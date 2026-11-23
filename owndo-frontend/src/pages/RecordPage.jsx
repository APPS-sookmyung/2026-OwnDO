import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EMOTIONS } from '../constants/emotions';
import PrimaryButton from '../components/PrimaryButton';
import EmotionButton from '../components/EmotionButton';

const RecordPage = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState(null);
  const [errors, setErrors] = useState({ content: false, emotion: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const currentDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\. /g, '. ').slice(0, -1); // Format YYYY. MM. DD

  const handleSubmit = async () => {
    const isContentEmpty = content.trim().length === 0;
    const isEmotionEmpty = !emotion;

    setErrors({
      content: isContentEmpty,
      emotion: isEmotionEmpty,
    });

    if (isContentEmpty || isEmotionEmpty) {
      return;
    }

    setIsSubmitting(true);
    setApiError('');

    try {
      const response = await fetch('/api/mind-cards/reinterpret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, emotion }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('AI 사용량이 초과되었습니다. 잠시 후(약 1분 뒤) 다시 시도해 주세요.');
        }
        if (response.status === 503) {
          throw new Error('AI 서비스가 혼잡해요. 잠시 후 다시 시도해 주세요.');
        }

        throw new Error('Failed to generate mind card');
      }

      const mindCard = await response.json();
      const recordData = {
        id: Date.now().toString(),
        content,
        emotion,
        date: new Date().toISOString(),
        mindCard,
      };

      const existingRecords = JSON.parse(localStorage.getItem('owndo_records') || '[]');
      existingRecords.push(recordData);
      localStorage.setItem('owndo_records', JSON.stringify(existingRecords));

      navigate('/card', { state: { recordData } });
    } catch (e) {
      console.error('Failed to create mind card', e);
      setApiError(e.message || '카드 생성에 실패했어요. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
      {/* Header */}
      <header style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px', position: 'relative' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            alignSelf: 'flex-start',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            padding: '8px 0',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
        >
          ← 뒤로가기
        </button>
        
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>오늘 하루를 들려주세요.</h2>
          <p style={{ color: 'var(--primary-color)', fontWeight: '500', fontSize: '1.1rem' }}>{currentDate}</p>
        </div>
      </header>

      {/* Record Section */}
      <section style={{ marginBottom: '48px', animation: 'fadeInUp 0.5s ease-out forwards' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px' }}>오늘 어떤 하루를 보냈나요?</h3>
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (errors.content) setErrors(prev => ({ ...prev, content: false }));
          }}
          placeholder="오늘 있었던 일이나 내가 한 일을 자유롭게 적어보세요."
          style={{
            width: '100%',
            minHeight: '200px',
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--surface-color)',
            border: `2px solid ${errors.content ? 'var(--error-color)' : 'transparent'}`,
            fontSize: '1.1rem',
            lineHeight: '1.6',
            boxShadow: 'var(--shadow-sm)',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={(e) => e.target.style.boxShadow = 'var(--shadow-md)'}
          onBlur={(e) => e.target.style.boxShadow = 'var(--shadow-sm)'}
        />
        {errors.content && (
          <p style={{ color: 'var(--error-color)', marginTop: '8px', fontSize: '0.9rem', animation: 'fadeIn 0.2s' }}>
            오늘 있었던 일을 한 줄만 남겨주세요.
          </p>
        )}
      </section>

      {/* Emotion Section */}
      <section style={{ marginBottom: '48px', animation: 'fadeInUp 0.6s ease-out forwards' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px' }}>지금 나의 마음은 어떤가요?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '16px' }}>
          {EMOTIONS.map((emo) => (
            <EmotionButton
              key={emo.id}
              emotion={emo}
              isSelected={emotion === emo.id}
              onClick={(id) => {
                setEmotion(id);
                if (errors.emotion) setErrors(prev => ({ ...prev, emotion: false }));
              }}
            />
          ))}
        </div>
        {errors.emotion && (
          <p style={{ color: 'var(--error-color)', marginTop: '8px', fontSize: '0.9rem', animation: 'fadeIn 0.2s' }}>
            지금 마음과 가장 가까운 감정을 골라주세요.
          </p>
        )}
      </section>

      {/* Submit Section */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', animation: 'fadeInUp 0.7s ease-out forwards' }}>
        <PrimaryButton onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? '카드 만드는 중...' : '기록 완료'}
        </PrimaryButton>
      </div>
      {apiError && (
        <p style={{ color: 'var(--error-color)', marginTop: '12px', textAlign: 'right' }}>
          {apiError}
        </p>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default RecordPage;
