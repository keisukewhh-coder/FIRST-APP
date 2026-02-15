import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 3秒後にホームにリダイレクト
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="text-xl font-bold text-text-primary mb-2">
        ページが見つかりません
      </h1>
      <p className="text-sm text-text-secondary mb-6">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <p className="text-xs text-text-secondary mb-4">
        3秒後にトップページに移動します…
      </p>
      <button
        className="px-6 py-3 rounded-full bg-vivid-pink text-white font-bold text-sm border-0 cursor-pointer hover:bg-coral-dark transition-colors"
        onClick={() => navigate('/', { replace: true })}
      >
        トップページに戻る
      </button>
    </div>
  );
}
