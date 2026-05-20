export function StatsSection() {
  const stats = [
    { value: '10K+', label: 'Usuários' },
    { value: 'R$ 2M+', label: 'Gerenciados' },
    { value: '50K+', label: 'Débitos Controlados' },
    { value: '4.9', label: 'Avaliação' },
  ];

  return (
    <section id="numeros" className="bg-blue-700 dark:bg-blue-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-200 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}