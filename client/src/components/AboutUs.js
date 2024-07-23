import React from "react";

const About1 = () => {
  return (
    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
            About Us
          </h1>
          <p className="font-normal text-base leading-6 text-gray-600 ">
            Welcome to 2-gether, a dating site uniquely tailored for individuals
            with disabilities. Our platform is not just about finding love; it's
            about fostering a supportive community where every member feels
            valued and understood.
          </p>
          <h1 className="text-2xl lg:text-2xl font-bold leading-9 text-gray-800 pb-4">
            Our Mission
          </h1>

          <p className="font-normal text-base leading-6 text-gray-600 ">
            At 2-gether, we believe everyone deserves the chance to experience
            love and companionship. That's why we've created a safe, welcoming,
            and accessible environment that empowers our users to connect with
            others who truly understand them. Accessibility isn’t just an
            option; it’s at the core of everything we do.
          </p>

          <h1 className="text-2xl lg:text-2xl font-bold leading-9 text-gray-800 pb-4">
            Why We Built 2-gether
          </h1>
          <p className="font-normal text-base leading-6 text-gray-600 ">
            Inspired by courses in our academic studies and conversations with
            community members, we saw a need for a dating platform that goes
            beyond mere functionality. We wanted to create a space that embodies
            understanding, respect, and genuine connectivity. Our development
            process focused intensely on accessibility, ensuring that every
            aspect of the site is user-friendly for people with varied
            abilities. We engaged with disability advocates to make sure that
            our site meets practical needs without compromising on style or fun.
          </p>
          <h1 className="text-2xl lg:text-2xl font-bold leading-9 text-gray-800 pb-4">
            Join Us
          </h1>
          <p className="font-normal text-base leading-6 text-gray-600 ">
            We invite you to join 2-gether to explore meaningful relationships
            in a community that celebrates diversity and inclusivity. Whether
            you're looking for friendship, love, or supportive connections, our
            site is here to empower and uplift you. Let's find togetherness,
            together.
          </p>
        </div>
        <div className="w-full lg:w-8/12 ">
          <img
            className="w-full h-full"
            src="office1.jpg"
            alt="A group of People"
          />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
            Our Founders
          </h1>
          <p className="font-normal text-base leading-6 text-gray-600 ">
            2-gether was founded by Almog Efrat Abergel and Shay Angel, two
            passionate fourth-year software engineering students driven by a
            commitment to inclusivity and technological innovation. Together,
            they envisioned a platform that not only brings people together but
            also respects and understands the unique challenges faced by
            individuals with disabilities.
          </p>
        </div>
        <div className="w-full lg:w-8/12 lg:pt-8">
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img
                className="md:block hidden"
                src="almog pic.jpg"
                alt="Alexa featured Img"
              />
              <img
                className="md:hidden block"
                src="https://i.ibb.co/zHjXqg4/Rectangle-118.png"
                alt="Alexa featured Img"
              />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                Almog Efrat Abergel
              </p>
            </div>

            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img
                className="md:block hidden"
                src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png"
                alt="Elijah featured img"
              />
              <img
                className="md:hidden block"
                src="https://i.ibb.co/ThZBWxH/Rectangle-121.png"
                alt="Elijah featured img"
              />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">
                Shai Angel
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About1;
