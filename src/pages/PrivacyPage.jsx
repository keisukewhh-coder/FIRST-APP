import { useNavigate } from 'react-router-dom';

const sections = [
  {
    title: '1. 収集する情報',
    items: [
      '診断結果の送信時に入力された名前（ニックネーム）',
      '決済情報（Stripe, Inc. が処理。当サービスではカード番号等を保持しません）',
      'アクセスログ（IPアドレス、ブラウザ情報等）',
    ],
  },
  {
    title: '2. 利用目的',
    items: [
      '有料送信機能の提供・運営',
      'サービスの改善および統計分析（個人を特定しない形で）',
    ],
  },
  {
    title: '3. 第三者提供',
    items: [
      '決済処理のため Stripe, Inc. に必要な情報を提供します',
      '上記以外の第三者への個人情報の提供は行いません',
    ],
  },
  {
    title: '4. データの保持期間',
    items: [
      '送信されたコンテンツ: 発行から48時間で自動的に無効化されます',
      '決済記録: 法令に基づき所定の期間保持します',
    ],
  },
  {
    title: '5. Cookie・トラッキング',
    items: [
      '本サービスでは必要最小限のCookieのみ使用しています',
      'サードパーティの広告トラッキングは使用していません',
    ],
  },
  {
    title: '6. お問い合わせ',
    items: ['[※要設定 例: contact@example.com]'],
  },
];

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
      <div className="py-4">
        <h1 className="text-xl font-bold text-vivid-pink text-center mb-6">
          プライバシーポリシー
        </h1>

        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-card rounded-2xl border border-coral/20 p-5"
            >
              <h2 className="text-base font-bold text-vivid-pink mb-3">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-text-primary leading-relaxed pl-4 relative before:content-['・'] before:absolute before:left-0 before:text-text-secondary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-xs text-text-secondary text-center mt-6">
          最終更新日: 2025年○月○日
        </p>

        <div className="mt-6 text-center">
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
