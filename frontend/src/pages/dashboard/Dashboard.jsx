// import { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { useAuthStore } from "../../store/auth.store";

// const API = import.meta.env.VITE_API_BASE_URL;
// const token = () => localStorage.getItem("token");

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const user = useAuthStore((s) => s.user);

//   const [circles, setCircles] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function load() {
//       try {
//         const headers = { Authorization: `Bearer ${token()}` };
//         const [circRes, evRes] = await Promise.all([
//           axios.get(`${API}/circles`, { headers }),
//           axios.get(`${API}/events`, { headers }),
//         ]);
//         setCircles(circRes.data);
//         setEvents(evRes.data.filter((e) => e.status === "open").slice(0, 3));
//       } catch {
//         // silently fail — partial data is fine
//       } finally {
//         setLoading(false);
//       }
//     }
//     load();
//   }, []);

//   const fmt = (n) =>
//     new Intl.NumberFormat("en-NG", {
//       style: "currency",
//       currency: "NGN",
//       maximumFractionDigits: 0,
//     }).format(n ?? 0);

//   const totalEscrow = circles.reduce((s, c) => s + (c.escrowBalance ?? 0), 0);
//   const firstName = user?.name?.split(" ")[0] ?? "there";

//   return (
//     <div className="min-h-screen bg-[--color-bg-base] px-4 py-8 pb-24 max-w-2xl mx-auto">
//       {/* Greeting */}
//       <div className="mb-8">
//         <p className="text-[--color-text-muted] text-sm mb-0.5">Good day,</p>
//         <h1 className="text-[--color-text-primary] text-2xl font-bold tracking-tight">
//           {firstName} 👋
//         </h1>
//       </div>

//       {/* Stats row */}
//       <div className="grid grid-cols-2 gap-3 mb-8">
//         <StatCard
//           label="Your circles"
//           value={loading ? "—" : circles.length}
//           icon="⭕"
//         />
//         <StatCard
//           label="Total in escrow"
//           value={loading ? "—" : fmt(totalEscrow)}
//           icon="🔒"
//           small
//         />
//       </div>

//       {/* Open events */}
//       <Section title="Open events" action={{ label: "See all", to: "/events" }}>
//         {loading ? (
//           <SkeletonList />
//         ) : events.length === 0 ? (
//           <Empty text="No open events right now." />
//         ) : (
//           <ul className="space-y-3">
//             {events.map((ev) => (
//               <EventRow key={ev._id} event={ev} fmt={fmt} navigate={navigate} />
//             ))}
//           </ul>
//         )}
//       </Section>

//       {/* Circles */}
//       <Section
//         title="My circles"
//         action={{ label: "Create new", to: "/circles/new" }}
//       >
//         {loading ? (
//           <SkeletonList />
//         ) : circles.length === 0 ? (
//           <Empty text="You haven't joined any circles yet.">
//             <Link
//               to="/circles/new"
//               className="mt-3 inline-block px-4 py-2 rounded-xl bg-[--color-brand-primary-500] text-white text-sm font-medium"
//             >
//               Create a circle
//             </Link>
//           </Empty>
//         ) : (
//           <ul className="space-y-3">
//             {circles.slice(0, 4).map((c) => (
//               <CircleRow key={c._id} circle={c} fmt={fmt} navigate={navigate} />
//             ))}
//           </ul>
//         )}
//       </Section>
//     </div>
//   );
// }

// function StatCard({ label, value, icon, small }) {
//   return (
//     <div className="bg-[--color-bg-card] rounded-2xl border border-[--color-border-light] shadow-[--shadow-card] p-4">
//       <span className="text-xl mb-2 block">{icon}</span>
//       <p
//         className={`text-[--color-text-primary] font-bold ${small ? "text-lg" : "text-2xl"} tracking-tight`}
//       >
//         {value}
//       </p>
//       <p className="text-[--color-text-muted] text-xs mt-0.5">{label}</p>
//     </div>
//   );
// }

// function Section({ title, action, children }) {
//   return (
//     <div className="mb-8">
//       <div className="flex items-center justify-between mb-3">
//         <h2 className="text-[--color-text-primary] text-base font-semibold">
//           {title}
//         </h2>
//         {action && (
//           <Link
//             to={action.to}
//             className="text-[--color-brand-primary-500] text-xs font-medium hover:underline"
//           >
//             {action.label}
//           </Link>
//         )}
//       </div>
//       {children}
//     </div>
//   );
// }

// function EventRow({ event, fmt, navigate }) {
//   const progress = Math.min(
//     (event.collectedAmount / event.targetAmount) * 100,
//     100,
//   );
//   return (
//     <li
//       onClick={() => navigate(`/events/${event._id}`)}
//       className="bg-[--color-bg-card] rounded-xl border border-[--color-border-light] px-4 py-3.5 cursor-pointer hover:shadow-[--shadow-soft] transition-all hover:-translate-y-0.5"
//     >
//       <div className="flex items-start justify-between mb-2">
//         <div>
//           <p className="text-[--color-text-primary] text-sm font-semibold">
//             {event.title}
//           </p>
//           <p className="text-[--color-text-muted] text-xs mt-0.5 capitalize">
//             {event.type}
//           </p>
//         </div>
//         <StatusBadge status={event.status} />
//       </div>
//       <div className="h-1 rounded-full bg-[--color-bg-base] overflow-hidden">
//         <div
//           className="h-full bg-[--color-brand-primary-500] rounded-full"
//           style={{ width: `${progress}%` }}
//         />
//       </div>
//       <div className="flex justify-between text-xs mt-1.5">
//         <span className="text-[--color-brand-primary-500] font-medium">
//           {fmt(event.collectedAmount)}
//         </span>
//         <span className="text-[--color-text-muted]">
//           of {fmt(event.targetAmount)}
//         </span>
//       </div>
//     </li>
//   );
// }

// function CircleRow({ circle, fmt, navigate }) {
//   const typeLabel = {
//     ajo: "Ajo / Esusu",
//     welfare: "Welfare",
//     trip: "Group Trip",
//     project: "Project",
//     levy: "Levy",
//   };
//   return (
//     <li
//       onClick={() => navigate(`/circles/${circle._id}`)}
//       className="bg-[--color-bg-card] rounded-xl border border-[--color-border-light] px-4 py-3.5 cursor-pointer hover:shadow-[--shadow-soft] transition-all hover:-translate-y-0.5 flex items-center justify-between"
//     >
//       <div>
//         <p className="text-[--color-text-primary] text-sm font-semibold">
//           {circle.name}
//         </p>
//         <p className="text-[--color-text-muted] text-xs mt-0.5">
//           {typeLabel[circle.type] ?? circle.type} ·{" "}
//           {circle.members?.length ?? 0} members
//         </p>
//       </div>
//       <div className="text-right">
//         <p className="text-[--color-text-primary] text-sm font-bold">
//           {fmt(circle.escrowBalance)}
//         </p>
//         <p className="text-[--color-text-muted] text-xs">in escrow</p>
//       </div>
//     </li>
//   );
// }
