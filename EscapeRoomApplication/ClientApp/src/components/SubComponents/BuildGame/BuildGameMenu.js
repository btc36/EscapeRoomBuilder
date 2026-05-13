import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const menuItems = [
  { url: 'stages',    label: 'Stages',          icon: '📋' },
  { url: 'puzzles',   label: 'Puzzles',          icon: '🧩' },
  { url: 'items',     label: 'Items',            icon: '🎒' },
  { url: 'props',     label: 'Props / Locations',icon: '📍' },
  { url: 'locks',     label: 'Locks',            icon: '🔒' },
  { url: 'lockTypes', label: 'Lock Types',       icon: '🗝️' },
];

export class BuildGameMenu extends Component {
  render() {
    return (
      <div className="buildGameMenu">
        <h1>Build Game</h1>
        <div className="build-menu-grid">
          {menuItems.map(item => (
            <Link key={item.url} to={'/' + item.url} className="build-menu-card">
              <span className="build-menu-card-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
