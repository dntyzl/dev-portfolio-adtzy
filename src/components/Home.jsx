
import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';
import '../css/home.css';

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))      .catch((err) => console.error('Failed to fetch home data:', err));
  }, []);

  return data ? (
    <Fade triggerOnce className="home-fade-container">
      <section className="hero">
        <div className="bento">

          {/* KOTAK KIRI: ROLE, NAMA, TAGLINE, DAN BUTTON */}
          <div className="tile hero-intro span-4">

            {/* BAGIAN ATAS: ROLE DAN IDENTITAS */}
            
          <div className="hero-content">
            {data?.status && (
              <span className="hero-eyebrow">
                {data.status}
              </span>
            )}

            {/* NAMA DI ATAS */}
            <h1 className="hero-name">
              {data?.name}
            </h1>
            
            {/* ANIMASI ROLE DI BAWAH NAMA */}
            <div className="hero-roles">
              <span>I'm&nbsp;</span>
              <Typewriter
                options={{
                  loop: true,
                  autoStart: true,
                  strings: data?.roles || [],
                }}
              />
            </div>

            {/* TAGLINE DI BAWAH ANIMASI */}
            {data?.tagline && (
              <p className="hero-tagline">
                {data.tagline}
              </p>
            )}
          </div>


            {/* BUTTON TETAP DI BAGIAN BAWAH */}
            <div className="hero-cta">
              <Link className="btn-pill btn-accent" to="/experience">
                View my experience
              </Link>

              <Link className="btn-pill btn-ghost" to="/about">
                About me
              </Link>
            </div>

          </div>

          {/* KOLOM KANAN: FOTO DAN FIND ME */}
          <div className="span-2 right-column">

            {/* FOTO PROFIL */}
            <div className="tile avatar-tile">
              <img
                src="/images/home/profile.jpeg"
                alt="Profile"
                className="avatar-img"
              />
            </div>

            {/* FIND ME */}
            <div className="tile tile--accent hero-social">
              <span className="tile-label">Find me</span>
              <Social />
            </div>

          </div>

        </div>
      </section>
    </Fade>
  ) : (
    <FallbackSpinner />
  );
}

export default Home;
