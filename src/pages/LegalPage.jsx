import { useNavigate } from 'react-router-dom';

const legalItems = [
  { label: '販売業者', value: '[※要設定]' },
  { label: '運営統括責任者', value: '[※要設定]' },
  { label: '所在地', value: '請求があった場合に遅滞なく開示いたします' },
  { label: '連絡先', value: '[※要設定 例: contact@example.com]' },
  { label: '販売価格', value: '120円（税込）/ 1通' },
  { label: '支払い方法', value: 'クレジットカード決済（Stripe）' },
  { label: '支払い時期', value: '購入時に即時決済' },
  { label: '商品の引渡時期', value: '決済完了後、即時提供' },
  {
    label: '返品・キャンセル',
    value:
      'デジタルコンテンツの性質上、決済完了後の返品・キャンセルはお受けできません',
  },
  { label: '動作環境', value: 'Chrome, Safari, Firefox, Edge の最新版' },
  {
    label: '有効期限',
    value: '送信されたコンテンツは発行から48時間有効です',
  },
];

export default function LegalPage() {
  const navigate = useNavigate();

  return (
      <div className="py-4">
        <h1 className="text-xl font-bold text-vivid-pink text-center mb-6">
          特定商取引法に基づく表示
        </h1>

        <div className="bg-card rounded-2xl border border-coral/20 p-5 space-y-4">
          {legalItems.map((item) => (
            <div
              key={item.label}
              className="border-b border-coral/10 pb-3 last:border-b-0 last:pb-0"
            >
              <dt className="text-sm font-bold text-vivid-pink mb-1">
                {item.label}
              </dt>
              <dd className="text-sm text-text-primary leading-relaxed">
                {item.value}
              </dd>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="btn-primary inline-block bg-vivid-pink text-text-primary font-bold text-sm px-8 py-3 rounded-full"
          >
            トップに戻る
          </button>
        </div>
      </div>
  );
}
