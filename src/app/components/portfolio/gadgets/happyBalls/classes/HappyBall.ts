export class HappyBall {
    velocity = {
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8,
    };
    mass = 1;
    opacity = 0;
    happy = new Image();

    ouchArray = {
        image0 : new Image(),
        image1 : new Image(),
        image2 : new Image(),
        image3 : new Image(),
        image4 : new Image(),
        image5 : new Image(),
        image6 : new Image(),
        image7 : new Image(),
        image8 : new Image(),
        image9 : new Image(),
        image10 : new Image(),
        image11 : new Image(),
        image12 : new Image(),
        image13 : new Image(),
        image14 : new Image(),
        image15 : new Image(),
    }
    audio1 = new Audio('../../../../../../assets/happyballs/sounds/ouch1.mp3')
    audio2 = new Audio('../../../../../../assets/happyballs/sounds/ouch2.mp3')
    audio3 = new Audio('../../../../../../assets/happyballs/sounds/ouch3.mp3')
    audio4 = new Audio('../../../../../../assets/happyballs/sounds/ouch4.mp3')
;
    constructor(private x, private y, private radius, private color, private collide, private coloring, private style, private image) {

        this.happy.src = '../../../../../../assets/happyballs/happyHans.jpg'
        
        this.ouchArray.image0.src = '../../../../../../assets/happyballs/ouch16.jpg'
        this.ouchArray.image1.src = '../../../../../../assets/happyballs/ouch1.jpg'
        this.ouchArray.image2.src = '../../../../../../assets/happyballs/ouch2.jpg'
        this.ouchArray.image3.src = '../../../../../../assets/happyballs/ouch3.jpg'
        this.ouchArray.image4.src = '../../../../../../assets/happyballs/ouch4.jpg'
        this.ouchArray.image5.src = '../../../../../../assets/happyballs/ouch5.jpg'
        this.ouchArray.image6.src = '../../../../../../assets/happyballs/ouch6.jpg'
        this.ouchArray.image7.src = '../../../../../../assets/happyballs/ouch7.jpg'
        this.ouchArray.image8.src = '../../../../../../assets/happyballs/ouch8.jpg'
        this.ouchArray.image9.src = '../../../../../../assets/happyballs/ouch9.jpg'
        this.ouchArray.image10.src = '../../../../../../assets/happyballs/ouch10.jpg'
        this.ouchArray.image11.src = '../../../../../../assets/happyballs/ouch11.jpg'
        this.ouchArray.image12.src = '../../../../../../assets/happyballs/ouch12.jpg'
        this.ouchArray.image13.src = '../../../../../../assets/happyballs/ouch13.jpg'
        this.ouchArray.image14.src = '../../../../../../assets/happyballs/ouch14.jpg'
        this.ouchArray.image15.src = '../../../../../../assets/happyballs/ouch15.jpg'
    }

    update = (c, mouseX, mouseY, balls, width, height) => {
        this.draw(c);

        // bounce other ball
        for (let i = 0; i < balls.length; i++) {
            if (this === balls[i]) continue;
            if (this.distanceToBall(this.x, this.y, balls[i].x, balls[i].y) - this.radius * 2 < 0 && this.collide === true) {
                this.resolveCollision(this, balls[i]);

                this.image = this.ouchArray["image" + Math.floor(Math.random() * 16)]                
                // this.audio1.play();
                setTimeout(() => {
                    this.image = this.happy
                }, 350)
            }
        }
        
        // bounce left of right wall
        if (this.x - this.radius <= 0 || this.x + this.radius >= width) {
            this.velocity.x = -this.velocity.x;

            this.image = this.ouchArray["image" + Math.floor(Math.random() * 16)]
            // this.audio2.play();
            setTimeout(() => {
                this.image = this.happy
            }, 350)

        }

        // bounce bottom or top wall
        if (this.y - this.radius <= 0 || this.y + this.radius >= height) {
            this.velocity.y = -this.velocity.y;

            this.image = this.ouchArray["image" + Math.floor(Math.random() * 16)]
            // this.audio3.play()
            setTimeout(() => {
                this.image = this.happy
            }, 350)
        }

        // fill ball colors in center
        if (this.distanceToBall(mouseX, mouseY, this.x, this.y) < 100 && this.opacity < 95 && this.coloring === true) {
            this.opacity += 0.02;
        } else if (this.opacity > 0) {
            this.opacity -= 0.02;
            this.opacity = Math.max(0, this.opacity);
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    runInterval = setInterval(() => {
        if(this.style !== "happy") {
            this.coloring = !this.coloring;
        }
    }, 4000)

    distanceToWall(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    distanceToBall(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    /**
     * Swaps out two colliding balls' x and y velocities after running through
     * an elastic collision reaction equation
     *
     * @param  Object | ball      | A ball object with x and y coordinates, plus velocity
     * @param  Object | otherball | A ball object with x and y coordinates, plus velocity
     * @return Null | Does not return a value
     */

    resolveCollision(particle, otherParticle) {
        const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
        const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

        const xDist = otherParticle.x - particle.x;
        const yDist = otherParticle.y - particle.y;

        // Prevent accidental overlap of balls
        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
            // Grab angle between the two colliding balls
            const angle = -Math.atan2(
                otherParticle.y - particle.y,
                otherParticle.x - particle.x
            );

            // Store mass in var for better readability in collision equation
            const m1 = particle.mass;
            const m2 = otherParticle.mass;

            // Velocity before equation
            const u1 = this.rotate(particle.velocity, angle);
            const u2 = this.rotate(otherParticle.velocity, angle);

            // Velocity after 1d collision equation
            const v1 = {
                x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
                y: u1.y,
            };
            const v2 = {
                x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
                y: u2.y,
            };

            // Final velocity after rotating axis back to original location
            const vFinal1 = this.rotate(v1, -angle);
            const vFinal2 = this.rotate(v2, -angle);

            // Swap particle velocities for realistic bounce effect
            particle.velocity.x = vFinal1.x;
            particle.velocity.y = vFinal1.y;

            otherParticle.velocity.x = vFinal2.x;
            otherParticle.velocity.y = vFinal2.y;
        }
    }

    /**
     * Rotates coordinate system for velocities
     *
     * Takes velocities and alters them as if the coordinate system they're on was rotated
     *
     * @param  Object | velocity | The velocity of an individual ball
     * @param  Float  | angle    | The angle of collision between two objects in radians
     * @return Object | The altered x and y velocities after the coordinate system has been rotated
     */

    rotate(velocity, angle) {
        const rotatedVelocities = {
            x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
            y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
        };

        return rotatedVelocities;
    }

    draw(c) {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.lineWidth = 1;
        c.strokeStyle = '#2465D3';
        c.stroke();
        c.clip();            
        c.drawImage(this.image, this.x-this.radius, this.y-this.radius, this.radius * 2, this.radius * 2 );
        c.restore();
    }
}

