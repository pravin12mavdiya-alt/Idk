import React from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export function Header() {
  const { profile } = useAuth();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="hdr">
      <div className="hdr-row">
        <Link to="/" className="brand">
          <div className="brand-logo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white" stroke="white" strokeWidth="1" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="brand-text">
              <span className="in">In</span><span className="mo">Motion</span>
            </div>
            <span className="brand-tagline">Motion is Everything</span>
          </div>
        </Link>
        <div className="hdr-right">
          <div className="hdr-btn">
            <svg fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <div className="notif-dot"></div>
          </div>
          <Link to="/profile" className="hdr-av">
            {profile?.name ? getInitials(profile.name) : 'ST'}
          </Link>
        </div>
      </div>
    </div>
  );
}
