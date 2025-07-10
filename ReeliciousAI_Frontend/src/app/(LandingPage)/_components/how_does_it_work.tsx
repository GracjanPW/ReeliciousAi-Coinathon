import Image from "next/image";

export default function HowDoesItWork() {
  const steps = [
    {
      number: "how_does_it_work_section/how_does_it_work_01.svg",
      image: "how_does_it_work_section/how_does_it_work_01_image.svg",
      title: "generate a script",
      text: "Enter a topic or prompt and our AI will generate an engaging script optimized for viral short-form content.",
    },
    {
      number: "how_does_it_work_section/how_does_it_work_02.svg",
      image: "how_does_it_work_section/how_does_it_work_02_image.svg",
      title: "select clips",
      text: "Browse our extensive library of brain rot clips or upload your own to match with your script.",
    },
    {
      number: "how_does_it_work_section/how_does_it_work_03.svg",
      image: "how_does_it_work_section/how_does_it_work_03_image.svg",
      title: "automatic editing",
      text: "Our AI editor combines your script and selected clips into a cohesive video with captions, transitions, and effects.",
    },
    {
      number: "how_does_it_work_section/how_does_it_work_04.svg",
      image: "how_does_it_work_section/how_does_it_work_04_image.svg",
      title: "publish instantly",
      text: "Share your AI-edited content directly to social platforms or mint as NFT in one click.",
    },
  ];

  return (
    <section className="relative w-full py-28 px-4">
      <div className="max-w-6xl m-auto px-6 relative">
        <h2 className="text-center text-4xl font-bold bg-gradient-to-r from-[#DA4731] to-[#9732BC] text-transparent bg-clip-text mb-16 tracking-wider">
          HOW DOES IT WORK
        </h2>

        <div className="hidden md:block absolute top-0 right-[-40px] bottom-0 w-[1px]">
          <div className="absolute top-0 bottom-0 w-[1px] bg-white" />

          <div className="sticky top-1/3 -translate-y-1/2 -translate-x-1/2 w-[24px] h-[24px]">
            <Image
              src="/how_does_it_work_section/how_does_it_work_ball.svg"
              alt="scroll ball"
              width={24}
              height={24}
            />
          </div>
        </div>

        <div className="flex flex-col gap-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-start md:justify-between gap-6"
            >
              <div className="flex flex-col md:flex-row gap-4 md:max-w-[50%] items-start">
                <div className="min-w-[60px] max-w-[80px]">
                  <Image
                    src={`/${step.number}`}
                    alt={`Step ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-auto"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-xl capitalize mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {step.text}
                  </p>
                </div>
              </div>
              <div className="w-full md:w-[45%]">
                <Image
                  src={`/${step.image}`}
                  alt={`Step ${index + 1} illustration`}
                  width={500}
                  height={300}
                  className="w-full h-auto mx-auto md:mx-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
