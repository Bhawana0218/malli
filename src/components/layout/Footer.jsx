import MalliLogo from '../common/MalliLogo';
import { VISIT, SPACES } from '../../data/spacesData';

/**
 * FOOTER
 *
 * A restaurant footer is a directory, not a billboard. Walnut, one brand line,
 * four columns of things a guest actually needs, and a legal strip. No motion,
 * no particles, and no height beyond what the content needs.
 */
export const Footer = () => {
  const year = new Date().getFullYear();

  const columns = [
    {
      heading: 'Explore',
      links: [
        { label: 'Our story', href: '#story' },
        { label: 'The rooms', href: '#spaces' },
        { label: 'Gastronomy', href: '#gastronomy' },
        { label: 'Wine & bar', href: '#wine' },
      ],
    },
    {
      heading: 'The rooms',
      links: SPACES.slice(0, 4).map((room) => ({ label: room.name, href: '#spaces' })),
    },
    {
      heading: 'Visit',
      lines: VISIT.addressLines,
      hours: VISIT.hours,
    },
    {
      heading: 'Reservations',
      links: [{ label: 'Reserve a table', href: '#reserve' }],
      contact: [
        { label: VISIT.phone, href: `tel:${VISIT.phone.replace(/[^\d+]/g, '')}` },
        { label: VISIT.email, href: `mailto:${VISIT.email}` },
      ],
    },
  ];

  return (
    <footer className="surface-wine relative w-full overflow-hidden text-paper-100">
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-20 sm:px-8 sm:pt-24 md:px-14 md:pt-28">
        {/* Brand block */}
        <div className="grid grid-cols-1 gap-10 border-b border-gold-200/15 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <MalliLogo alt="Malli" className="h-12 w-auto" />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-[1.7] text-paper-100/65">
              A jasmine house in Holly Springs — seven rooms, one kitchen, and
              an Indian kitchen cooking the way it was taught.
            </p>
          </div>

          {/* Directory */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-7">
            {columns.map((col) => (
              <div key={col.heading}>
                <h3 className="label text-gold-200/80">{col.heading}</h3>

                {col.links && (
                  <ul className="mt-5 space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="link-underline text-[0.8125rem] text-paper-100/70 transition-colors duration-300 hover:text-gold-200"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                {col.contact && (
                  <ul className="mt-5 space-y-2.5">
                    {col.contact.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="link-underline text-[0.8125rem] text-paper-100/70 transition-colors duration-300 hover:text-gold-200"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                {col.lines && (
                  <address className="mt-5 not-italic text-[0.8125rem] leading-relaxed text-paper-100/70">
                    {col.lines.map((line) => (
                      <span key={line} className="block">{line}</span>
                    ))}
                  </address>
                )}

                {col.hours && (
                  <dl className="mt-5 space-y-1.5 text-[0.75rem]">
                    {col.hours.map(([day, time]) => (
                      <div key={day} className="flex justify-between gap-3">
                        <dt className="text-paper-100/45">{day}</dt>
                        <dd className="text-paper-100/70">{time}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legal strip */}
        <div className="flex flex-col items-start justify-between gap-4 pt-7 sm:flex-row sm:items-center">
          <p className="text-[0.6875rem] text-paper-100/45">
            © {year} Malli. All rights reserved.
          </p>

          <ul className="flex items-center gap-5">
            {VISIT.social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[0.6875rem] text-paper-100/55 transition-colors duration-300 hover:text-gold-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
