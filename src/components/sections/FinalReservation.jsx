import { useEffect, useRef, useState } from 'react';
import gsap, { ScrollTrigger } from '../../lib/gsap';
import MalliLogo from '../common/MalliLogo';
import Botanical from '../common/Botanical';
import { SPACES, VISIT } from '../../data/spacesData';

const SEATINGS = [
  { value: '17:30', label: '5:30 pm' },
  { value: '19:00', label: '7:00 pm' },
  { value: '20:00', label: '8:00 pm' },
  { value: '21:45', label: '9:45 pm' },
];

const GUESTS = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
  value: String(n),
  label: n === 1 ? '1 guest' : `${n} guests`,
}));

/** `YYYY-MM-DD` in local time — the only format a date input accepts. */
const toInputDate = (date) => {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

/**
 * RESERVATION
 *
 * The walnut close. One form, four decisions, no decoration competing with it.
 * The field labels are set in sentence case — a booking form is a utility, and
 * pretending otherwise is what makes a site feel designed by a template.
 */
export const FinalReservation = () => {
  const today = new Date();
  const transitionRef = useRef(null);

  const [form, setForm] = useState(() => ({
    guests: '2',
    space: SPACES[1].name,
    date: toInputDate(today),
    time: '20:00',
    name: '',
    email: '',
  }));
  const [confirmed, setConfirmed] = useState(null);

  useEffect(() => {
    const section = document.getElementById('reserve');
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      // Crossfade transition from Culinary: fade out overlay as section scrolls in
      if (transitionRef.current) {
        gsap.fromTo(
          transitionRef.current,
          { opacity: 1 },
          {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top center',
              scrub: 1,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const update = (field) => (event) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setConfirmed(form);
  };

  const field =
    'w-full border border-paper-50/30 bg-walnut-950/70 px-3.5 py-3 text-sm text-paper-50 placeholder:text-paper-100/35 transition-all duration-200 outline-none hover:border-paper-50/45 focus:border-gold-200/80 focus:bg-walnut-950/90';
  const label = 'mb-2 block text-[0.75rem] font-medium tracking-[0.06em] text-paper-100/75';

  return (
    <section id="reserve" className="relative overflow-hidden text-paper-50">
      {/* Dimmed room photograph as background - using the corridor image for intimate feel */}
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src="/media/corridor.webp"
          alt=""
          className="h-full w-full object-cover"
          style={{
            objectPosition: '50% 50%',
            filter: 'brightness(0.35) contrast(1.1) saturate(0.9)',
          }}
        />
        {/* Directional gradient: darker on left (form side), transparent on right */}
        <div className="absolute inset-0 scrim-right hidden lg:block" />
        <div className="absolute inset-0 scrim-bottom md:hidden" />
      </div>

      {/* Transition overlay at top: fades out as we scroll in from Culinary */}
      <div
        ref={transitionRef}
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[60vh] z-0 pointer-events-none bg-gradient-to-b from-walnut-950 via-walnut-950 to-transparent hidden lg:block"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32 md:px-14 md:py-40">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: the invitation. */}
          <div className="lg:col-span-5">
            <MalliLogo alt="Malli" className="h-10 w-auto" />
            <h2 className="display mt-8 text-[clamp(2.5rem,6vw,4.25rem)] text-paper-50">
              Your table
              <br />
              is <em>waiting</em>.
            </h2>
            <p className="mt-7 max-w-md text-[0.9375rem] leading-[1.8] text-paper-100/85">
              Tell us when and where you would like to sit. We will confirm by
              phone or email, usually the same day.
            </p>

            {/* The practical details live here rather than in a card, so the
                invitation column carries its own weight instead of trailing off
                into empty space beside the form. */}
            <dl className="mt-12 max-w-sm space-y-6 border-t border-gold-200/20 pt-8">
              <div>
                <dt className="label text-gold-200/85">Address</dt>
                <dd className="mt-2 text-[0.875rem] leading-relaxed text-paper-100/85">
                  {VISIT.addressLines.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="label text-gold-200/85">Hours</dt>
                <dd className="mt-2 space-y-1 text-[0.875rem] text-paper-100/85">
                  {VISIT.hours.slice(0, 3).map(([day, time]) => (
                    <span key={day} className="flex justify-between gap-6">
                      <span className="text-paper-100/60">{day}</span>
                      <span>{time}</span>
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="label text-gold-200/85">Telephone</dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${VISIT.phone.replace(/[^\d+]/g, '')}`}
                    className="link-underline text-[0.875rem] text-paper-100/85 transition-colors duration-300 hover:text-gold-100"
                  >
                    {VISIT.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Right: the form. */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border border-gold-200/25 bg-walnut-950/80 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:p-9">
              <Botanical name="Gardenia" className="mb-7 h-10 w-10 text-gold-200/55" />
              <div aria-live="polite">
                {confirmed ? (
                  <div className="py-10 text-center">
                    <Botanical name="Jasmine" className="mx-auto mb-6 h-12 w-12 text-gold-200/50" />
                    <p className="font-serif text-2xl font-light text-paper-50">Request received</p>
                    <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-paper-100/80">
                      Thank you, {confirmed.name || 'we have your details'}. We have your request for{' '}
                      {confirmed.guests} in {confirmed.space} on {confirmed.date} at {confirmed.time}.
                      Someone from the floor will be in touch to confirm.
                    </p>
                    <button
                      type="button"
                      onClick={() => setConfirmed(null)}
                      className="btn-quiet mt-8 text-gold-200"
                    >
                      Change the details
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="res-name" className={label}>Name</label>
                        <input
                          id="res-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          value={form.name}
                          onChange={update('name')}
                          className={field}
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="res-email" className={label}>Email</label>
                        <input
                          id="res-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          value={form.email}
                          onChange={update('email')}
                          className={field}
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <label htmlFor="res-guests" className={label}>Guests</label>
                        <select
                          id="res-guests"
                          name="guests"
                          value={form.guests}
                          onChange={update('guests')}
                          className={field}
                        >
                          {GUESTS.map((g) => (
                            <option key={g.value} value={g.value}>{g.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="res-space" className={label}>Room</label>
                        <select
                          id="res-space"
                          name="space"
                          value={form.space}
                          onChange={update('space')}
                          className={field}
                        >
                          {SPACES.map((room) => (
                            <option key={room.id} value={room.name}>{room.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="res-date" className={label}>Date</label>
                        <input
                          id="res-date"
                          name="date"
                          type="date"
                          required
                          min={toInputDate(today)}
                          value={form.date}
                          onChange={update('date')}
                          className={field}
                        />
                      </div>
                      <div>
                        <label htmlFor="res-time" className={label}>Time</label>
                        <select
                          id="res-time"
                          name="time"
                          value={form.time}
                          onChange={update('time')}
                          className={field}
                        >
                          {SEATINGS.map((s) => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-5 border-t border-gold-200/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-[0.75rem] text-paper-100/50">
                        Smart evening dress. Large groups, please call.
                      </span>
                      <button type="submit" className="btn-primary">
                        Request a table
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalReservation;
