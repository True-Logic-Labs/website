export const slideContents = [
  {
    uid: "slide1",
    content: `
      <div class="slide">
        <div class="tag">📚 Knowledge</div>
        <div class="title">What is Healthy Weight Loss?</div>
        <div class="subTitle">Sustainable, Not Fast</div>
        <div class="about">
          Weight loss should be gradual (1-2 lbs per week). Quick fixes can harm your metabolism. Focus on a sustainable approach!
        </div>
        <div class="ctaButton">
          <a href="#">Learn More</a>
        </div>
      </div>
    `,
  },
  {
    uid: "slide2",
    content: `
      <div class="slide">
        <div class="tag">🥗 Healthy Eating</div>
        <div class="title">Fuel Your Body Right</div>
        <div class="subTitle">Balanced Meals for Fat Loss</div>
        <div class="about">
          Eat more whole foods, fiber, and lean protein. Avoid highly processed and sugary foods to keep energy stable.
        </div>
        <div class="ctaButton">
          <a href="#">See Meal Plans</a>
        </div>
      </div>
    `,
  },
];

export const slideContents1 = [
          {
            uid: "slide1",
            content: `
              <div class="slide">
                <div class="tag">🔥 Hot Topic</div>
                <div class="title">What is RAG?</div>
                <div class="subTitle">
                  Enhancing LLMs with External Knowledge
                </div>
                <div class="about">
                  RAG improves LLMs by retrieving relevant external documents
                  before generating responses.
                </div>
                <div class="ctaButton">
                  <a href="#">Show More</a>
                </div>
              </div>
            `,
          },
          {
            uid: "slide2",
            content: `
              <div class="slide">
                <div class="tag">💡 Insightful</div>
                <div class="title">Why is RAG Important?</div>
                <div class="subTitle">Overcoming Knowledge Cutoffs</div>
                <div class="about">
                  RAG enables access to updated and domain-specific information,
                  reducing outdated responses.
                </div>
                <div class="ctaButton">
                  <a href="#">Learn More</a>
                </div>
            </div>
            `,
          },

          {
            uid: "slide3",
            content: `
      <div class="slide">
        <div class="tag">🚀 Cutting-Edge</div>
        <div class="title">Types of Memory in LLMs</div>
        <div class="subTitle">Short-Term, Long-Term & External Memory</div>
        <div class="about">LLMs use a combination of internal and external memory for better contextual understanding.</div>
        <div class="ctaButton"><a href="#">Explore</a></div>
      </div>
    `,
          },
          {
            uid: "slide4",
            content: `
      <div class="slide">
        <div class="tag">🎯 Practical</div>
        <div class="title">How RAG Uses Memory</div>
        <div class="subTitle">Retrieving Knowledge in Real-Time</div>
        <div class="about">RAG retrieves information before generating a response, enhancing factual accuracy.</div>
        <div class="ctaButton"><a href="#">Read More</a></div>
      </div>
    `,
          },
          {
            uid: "slide5",
            content: `
      <div class="slide">
        <div class="tag">🔥 Trending</div>
        <div class="title">RAG vs Traditional LLMs</div>
        <div class="subTitle">Comparing Performance & Reliability</div>
        <div class="about">Unlike traditional LLMs, RAG reduces hallucinations and improves real-time knowledge access.</div>
        <div class="ctaButton"><a href="#">See Comparison</a></div>
      </div>
    `,
          },
          {
            uid: "slide6",
            content: `
      <div class="slide">
        <div class="tag">🌎 Future Ready</div>
        <div class="title">The Future of RAG</div>
        <div class="subTitle">Advancing AI with Smarter Retrieval</div>
        <div class="about">As vector search and AI memory evolve, RAG will be a crucial part of AI systems.</div>
        <div class="ctaButton"><a href="#">Discover More</a></div>
      </div>
    `,
          },
          {
            uid: "slide7",
            content: `
            <div class="slide">
     <iframe width="560" height="315" src="https://www.youtube.com/embed/gbFU6KoEASU?si=ku9w7ztJ8_JBAeaR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
     </div>
    `,
          },
          {
            uid: "slide8",
            content: `
      <div class="slide">
<iframe src="http://localhost:4321/tools" title="Wikipedia"></iframe>
      </div>
    `,
          },
];
        

        export const slideProperties = [
          {uid: "slide1", x: 0},
          {uid: "slide2", x: 0, y: 1000},
          {uid: "slide3", x: 1000},
          {uid: "slide4", x: 1000, y: 1000},
          {uid: "slide5", x: 2000},
          {uid: "slide6", x: 2000, y: 1000},
          {uid: "slide7", x: 3000},
        { uid: "slide8", x: 3000, y: 1000 },
        {uid: "slide9", x: 4000},
          {uid: "slide10", x: 4000, y: 1000},
        ];



        export class ImpressSlides {
          constructor(containerId) {
            this.container = document.getElementById(containerId);
            this.slides = [];
          }

          addSlide({
            content = "No Content",
            x = 0,
            y = 0,
            z = 0,
            scale = 1,
            rotateX = 0,
            rotateY = 0,
          }) {
            const slide = document.createElement("div");
            slide.className = "step";
            slide.setAttribute("data-x", x);
            slide.setAttribute("data-y", y);
            slide.setAttribute("data-z", z);
            slide.setAttribute("data-scale", scale);
            slide.setAttribute("data-rotate-x", rotateX);
            slide.setAttribute("data-rotate-y", rotateY);
            slide.setAttribute("data-transition-duration", "1000");
            slide.innerHTML = content;
            this.container.appendChild(slide);
            this.slides.push(slide);
          }

          init() {
              impress().init();

          }
        }




        // Save array
export function saveArrayToLocalStorage(key, array) {
  try {
    localStorage.setItem(key, JSON.stringify(array));
    console.log("Array saved successfully!");
  } catch (error) {
    console.error("Error saving array:", error);
  }
}

// Get array
export function getArrayFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error retrieving array:", error);
    return null;
  }
}