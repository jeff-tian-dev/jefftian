"use client";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Primary gradient blob */}
      <div
        className="absolute -top-40 -left-40 h-[600px] w-[600px] animate-blob rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(139,92,246,0.4) 50%, transparent 70%)",
        }}
      />

      {/* Secondary gradient blob */}
      <div
        className="animate-blob-reverse absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full opacity-15 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.8) 0%, rgba(99,102,241,0.4) 50%, transparent 70%)",
          animationDelay: "2s",
        }}
      />

      {/* Tertiary gradient blob */}
      <div
        className="absolute -bottom-40 left-1/3 h-[500px] w-[500px] animate-blob rounded-full opacity-10 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(6,182,212,0.4) 50%, transparent 70%)",
          animationDelay: "4s",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, #030014 70%)",
        }}
      />
    </div>
  );
}
