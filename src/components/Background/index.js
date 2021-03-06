import React from "react";
import Particles from "react-tsparticles";

const Background = () => {
  return (
    <div id="background">
      <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "#333344",
            },
          },
          fpsLimit: 30,
          particles: {
            color: {
              value: "#aaaaaa",
            },
            links: {
              color: "#aaaaaa",
              distance: 100,
              enable: true,
              opacity: 0.1,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 600,
              },
              value: 80,
            },
            opacity: {
              value: 0.1,
            },
            size: {
              random: true,
              value: 3,
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default Background;
