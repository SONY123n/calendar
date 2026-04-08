import React, { useState, useRef, useEffect } from 'react';
import CalendarFrame from './components/CalendarFrame.jsx';
import {
  format, addMonths, subMonths, startOfMonth, endOfMonth,
  eachDayOfInterval, isSameDay, startOfWeek, endOfWeek, isWithinInterval
} from 'date-fns';
import { Bell, ChevronLeft, ChevronRight, Trash2, Sparkles, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- THEME ---
const monthThemes = {
  0: { img: "https://images.unsplash.com/photo-1548574505-5e239809ee19", accent: "#3b82f6" },
  1: { img: "https://images.unsplash.com/photo-1596120236172-231999844ade", accent: "#ec4899" },
  2: { img: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7", accent: "#10b981" },
  3: { img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b", accent: "#f59e0b" },
  4: { img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e", accent: "#059669" },
  5: { img: "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85", accent: "#0ea5e9" },
  6: { img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", accent: "#06b6d4" },
  7: { img: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843", accent: "#84cc16" },
  8: { img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e", accent: "#d946ef" },
  9: { img: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7", accent: "#f97316" },
  10:{ img: "https://images.unsplash.com/photo-1508556497405-ed7dcd94acfc", accent: "#4f46e5" },
  11:{ img: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be", accent: "#ef4444" },
};

const globalEvents = { 
  "2026-01-01": "New Year's Day 🎊", "2026-01-26": "Republic Day 🇮🇳",
  "2026-02-14": "Valentine's Day ❤️", "2026-03-03": "Holi Festival 🎨",
  "2026-03-20": "Spring Equinox 🌱", "2026-04-14": "Ambedkar Jayanti 🇮🇳",
  "2026-04-22": "Earth Day 🌍", "2026-05-01": "May Day / Labour Day 💪",
  "2026-06-05": "World Environment Day 🌿", "2026-06-21": "International Yoga Day 🧘‍♂️",
  "2026-08-15": "Independence Day 🇮🇳", "2026-10-20": "Diwali Festival 🪔",
  "2026-12-25": "Christmas Day 🎄", "2026-12-31": "New Year's Eve ✨",
};

function App() {
  const [viewDate, setViewDate] = useState(new Date(2026, 3, 1));
  const [range, setRange] = useState({ start: null, end: null });
  const [events, setEvents] = useState(() => JSON.parse(localStorage.getItem('vellum_user_events') || '{}'));
  const [showModal, setShowModal] = useState(false);
  const [newEventText, setNewEventText] = useState('');
  const [stickyNoteDate, setStickyNoteDate] = useState(null);

  const clickTimeout = useRef(null);
  const currentTheme = monthThemes[viewDate.getMonth()];
  const allEvents = { ...globalEvents, ...events };

  // --- SMART CLICK LOGIC ---
  const onDayClick = (day) => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      setStickyNoteDate(day); // Double Click -> Show Sticky
    } else {
      clickTimeout.current = setTimeout(() => {
        handleRangeSelection(day); // Single Click -> Start Range
        clickTimeout.current = null;
      }, 250);
    }
  };

  const handleRangeSelection = (day) => {
    if (!range.start || range.end) {
      setRange({ start: day, end: null });
    } else {
      if (day < range.start) {
        setRange({ start: day, end: null });
      } else {
        setRange({ start: range.start, end: day });
        setShowModal(true);
      }
    }
  };

  const saveEvent = () => {
    if (!newEventText.trim()) return cancelSelection();
    const startKey = format(range.start, 'yyyy-MM-dd');
    const isActualRange = range.end && !isSameDay(range.start, range.end);
    
    // Non-overwriting logic
    const existing = events[startKey] || "";
    const rangeLabel = isActualRange ? `[Range ${format(range.start, 'd')}-${format(range.end, 'd')}]: ` : "";
    const combined = existing ? `${existing} | ${rangeLabel}${newEventText}` : `${rangeLabel}${newEventText}`;

    const updated = { ...events, [startKey]: combined };
    setEvents(updated);
    localStorage.setItem('vellum_user_events', JSON.stringify(updated));
    cancelSelection();
  };

  const cancelSelection = () => {
    setRange({ start: null, end: null });
    setShowModal(false);
    setNewEventText('');
  };

  const deleteEvent = (key) => {
    const updated = { ...events };
    delete updated[key];
    setEvents(updated);
    localStorage.setItem('vellum_user_events', JSON.stringify(updated));
  };

  const getEventForDay = (day) => {
    const key = format(day, 'yyyy-MM-dd');
    return allEvents[key] || null;
  };

  const calendarDays = eachDayOfInterval({
    start: startOfWeek(startOfMonth(viewDate), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(viewDate), { weekStartsOn: 1 }),
  });

  return (
    <div className="min-h-screen pb-20 relative" style={{ backgroundColor: `${currentTheme.accent}10` }}>
      
      {/* NAV CONTROLS */}
      <div className="fixed top-1/2 left-4 right-4 -translate-y-1/2 flex justify-between z-40 pointer-events-none">
        <button className="p-4 bg-white shadow-xl rounded-full pointer-events-auto active:scale-90 transition-transform" onClick={() => setViewDate(subMonths(viewDate, 1))}><ChevronLeft/></button>
        <button className="p-4 bg-white shadow-xl rounded-full pointer-events-auto active:scale-90 transition-transform" onClick={() => setViewDate(addMonths(viewDate, 1))}><ChevronRight/></button>
      </div>

      <CalendarFrame monthName={format(viewDate, 'MMMM').toUpperCase()} year={format(viewDate, 'yyyy')} bgImage={currentTheme.img}>
        
        {/* 📝 LEFT: RULED MEMOS */}
        <div className="md:col-span-4 border-r border-slate-200 p-8 ruled-paper max-h-[650px] overflow-y-auto custom-scrollbar">
          <h2 className="font-serif italic text-3xl mb-8 flex items-center gap-2 sticky top-0 bg-white/50 backdrop-blur-sm p-2 rounded-lg z-10">
            <Bell style={{ color: currentTheme.accent }}/> Memos
          </h2>
          <div className="space-y-6">
            {Object.entries(allEvents)
              .filter(([date]) => date.startsWith(format(viewDate, 'yyyy-MM')))
              .map(([date, text]) => (
              <div key={date} className="group border-b border-dashed border-slate-300 pb-3 flex justify-between items-start animate-slide">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: currentTheme.accent }}>{format(new Date(date), 'MMM do')}</p>
                  <p className="text-sm font-medium text-slate-600 break-words whitespace-pre-wrap leading-relaxed">{text}</p>
                </div>
                {events[date] && <button onClick={() => deleteEvent(date)} className="text-red-400 ml-2 hover:scale-110"><Trash2 size={16}/></button>}
              </div>
            ))}
          </div>
        </div>

        {/* 📅 RIGHT: CALENDAR GRID */}
        <div className="md:col-span-8 p-6 md:p-12 textured-paper">
          <div className="grid grid-cols-7 gap-2 mb-8 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-y-3">
            {calendarDays.map((day, idx) => {
              const dateKey = format(day, 'yyyy-MM-dd');
              const isCurrentMonth = format(day, 'M') === format(viewDate, 'M');
              const isToday = isSameDay(day, new Date());
              const isStart = range.start && isSameDay(day, range.start);
              const isEnd = range.end && isSameDay(day, range.end);
              const inRange = range.start && range.end && isWithinInterval(day, { start: range.start, end: range.end });

              return (
                <div 
                  key={idx} 
                  onClick={() => isCurrentMonth && onDayClick(day)}
                  className={`relative h-16 md:h-24 flex items-center justify-center cursor-pointer transition-all border
                    ${isCurrentMonth ? 'bg-white shadow-sm' : 'bg-slate-50 opacity-20 pointer-events-none'}
                    ${isStart ? 'rounded-l-2xl z-10 text-white shadow-lg' : 'border-transparent'}
                    ${isEnd ? 'rounded-r-2xl z-20 text-white shadow-lg' : ''}
                  `}
                  style={{ backgroundColor: isStart || isEnd ? currentTheme.accent : inRange ? `${currentTheme.accent}20` : '' }}
                >
                  <span className={`text-lg md:text-2xl font-bold ${isStart || isEnd ? 'text-white' : 'text-slate-700'}`}>{format(day, 'd')}</span>
                  {allEvents[dateKey] && isCurrentMonth && !isStart && !isEnd && <Sparkles size={12} className="absolute top-2 right-2" style={{ color: currentTheme.accent }}/>}
                  {isToday && !isStart && !isEnd && <div className="absolute inset-0 border-2 rounded-xl animate-pulse" style={{ borderColor: currentTheme.accent }} />}
                </div>
              );
            })}
          </div>
        </div>
      </CalendarFrame>

      {/* --- OVERLAYS --- */}
      <AnimatePresence>
        {stickyNoteDate && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setStickyNoteDate(null)}
          >
            <motion.div 
              initial={{ y: 50, rotate: -2 }} animate={{ y: 0, rotate: 1 }}
              onClick={e => e.stopPropagation()} 
              className="bg-[#fff9e6] w-full max-w-sm rounded-xl p-10 relative border-l-[15px] border-yellow-400 shadow-2xl"
            >
              <button onClick={() => setStickyNoteDate(null)} className="absolute top-4 right-4 text-slate-400"><XCircle size={32}/></button>
              <div className="border-b border-yellow-200 pb-4 mb-6 text-left leading-tight">
                <p className="text-xs font-bold text-yellow-600 uppercase mb-1">{format(stickyNoteDate, 'yyyy • MMMM')}</p>
                <h1 className="text-8xl font-serif italic text-slate-800 leading-none">{format(stickyNoteDate, 'd')}</h1>
                <h2 className="text-2xl font-black uppercase text-slate-400 tracking-tighter">{format(stickyNoteDate, 'EEEE')}</h2>
              </div>
              <div className="text-left">
                <h3 className="text-[10px] font-black uppercase text-yellow-700 mb-2">Saved Plans:</h3>
                <p className="text-lg font-medium text-slate-700 italic font-serif leading-relaxed break-words">
                  {getEventForDay(stickyNoteDate) || "No tasks planned."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6" onClick={cancelSelection}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()} className="bg-white p-8 rounded-[32px] shadow-2xl w-full max-w-md">
              <h3 className="text-2xl font-serif italic mb-2">New Plan</h3>
              <p className="text-xs text-slate-400 mb-6 uppercase tracking-widest">{format(range.start, 'MMM do')} {range.end ? `to ${format(range.end, 'MMM do')}` : ""}</p>
              <textarea 
                autoFocus className="w-full p-5 bg-slate-50 rounded-2xl mb-6 h-32 outline-none border-2 border-transparent focus:border-slate-200" 
                placeholder="What are we planning?" value={newEventText} onChange={e => setNewEventText(e.target.value)} 
              />
              <div className="flex gap-4">
                <button onClick={cancelSelection} className="flex-1 py-4 rounded-2xl bg-slate-100 text-slate-400 font-bold">Cancel</button>
                <button onClick={saveEvent} className="flex-1 py-4 rounded-2xl text-white font-bold shadow-lg" style={{ backgroundColor: currentTheme.accent }}>Save Plan</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;