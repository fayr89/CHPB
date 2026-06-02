import type { ReactNode } from 'react';
import { useContent } from '@/content/ContentContext';

function Clause({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="mb-6">
      <h2 className="font-heading text-base font-bold text-foreground-950 mb-2">
        {n}. {title}
      </h2>
      <p className="text-foreground-700 text-sm leading-relaxed">{children}</p>
    </section>
  );
}

export default function Privacy() {
  const { brand, footer, legal } = useContent();
  const operator = legal.companyName || brand.name;
  const contacts = [footer.address, footer.phone, footer.email].filter(Boolean).join(', ');

  return (
    <div className="min-h-screen bg-background-50 text-foreground-900">
      <header className="border-b border-background-200">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src={brand.logo} alt={brand.name} className="h-10 w-auto object-contain" />
          </a>
          <a href="/" className="text-sm text-foreground-600 hover:text-foreground-950 transition-colors">
            ← На главную
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground-950 mb-2">
          Политика конфиденциальности
        </h1>
        <p className="text-foreground-500 text-sm mb-8">
          Согласие на обработку персональных данных
        </p>

        <Clause n="1" title="Общие положения">
          Настоящая Политика определяет порядок обработки и защиты персональных данных
          пользователей сайта (далее — «Сайт»). Отправляя форму на Сайте, пользователь
          подтверждает согласие с настоящей Политикой и даёт согласие на обработку своих
          персональных данных.
        </Clause>

        <Clause n="2" title="Оператор">
          Оператором персональных данных является {operator || 'владелец Сайта'}.
          {legal.inn ? ` ИНН: ${legal.inn}.` : ''}
          {legal.ogrn ? ` ОГРН: ${legal.ogrn}.` : ''}
          {contacts ? ` Контактные данные: ${contacts}.` : ''}
        </Clause>

        <Clause n="3" title="Какие данные обрабатываются">
          Имя, номер телефона, адрес электронной почты, а также иные сведения, которые
          пользователь добровольно указывает в форме заявки или подписки.
        </Clause>

        <Clause n="4" title="Цели обработки">
          Обработка и выполнение заявок, обратная связь с пользователем, консультирование и
          информирование об услугах Оператора.
        </Clause>

        <Clause n="5" title="Правовые основания">
          Обработка осуществляется на основании согласия субъекта персональных данных, а также в
          соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
        </Clause>

        <Clause n="6" title="Передача данных">
          Персональные данные могут обрабатываться в используемой Оператором CRM-системе для
          выполнения заявок. Оператор не передаёт персональные данные третьим лицам, за
          исключением случаев, предусмотренных законодательством РФ.
        </Clause>

        <Clause n="7" title="Сроки хранения">
          Персональные данные хранятся до достижения целей обработки или до отзыва согласия
          субъектом персональных данных.
        </Clause>

        <Clause n="8" title="Права пользователя">
          Пользователь вправе запросить доступ к своим данным, их исправление или удаление, а
          также отозвать согласие на обработку, направив обращение
          {footer.email ? ` на ${footer.email}` : ' Оператору'}.
        </Clause>

        <Clause n="9" title="Защита данных">
          Оператор принимает необходимые организационные и технические меры для защиты
          персональных данных от неправомерного доступа, изменения, раскрытия или уничтожения.
        </Clause>

        <Clause n="10" title="Изменения политики">
          Оператор вправе изменять настоящую Политику. Актуальная редакция всегда размещена на
          этой странице.
        </Clause>
      </main>

      <footer className="border-t border-background-200">
        <div className="max-w-3xl mx-auto px-6 py-6 text-xs text-foreground-500">
          {footer.copyright}
        </div>
      </footer>
    </div>
  );
}
