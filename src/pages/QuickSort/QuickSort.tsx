// import React, { useCallback, useEffect, useState } from "react";
// import "@/components/Lab/Lab.css";
// import "@/pages/QuickSort/QuickSort.css";

// export default function QuickSort() {
//   return (
//     <main id="main-wrapper">
//       <div id="grid-container">
//         <section className="item1">
//           <div id="overview-content">
//             <h1>Quick Sort</h1>
//             <p>Quick Sort is an advance sorting algorithm...</p>
//           </div>
//         </section>
//         <section className="item2">
//           <div id="guide-container">
//             <h2 id="guide">GUIDE</h2>
//           </div>
//           <p id="user-instructions"></p>
//           <p id="steps"></p>
//           <p id="outer-loop-info"></p>
//           <p id="inner-loop-info"></p>
//         </section>
//         <section className="item3">
//           <p id="result"></p>
//           <p id="status-info"></p>
//         </section>
//         <section className="item4">
//           <form className="quickSortForm">
//             <div id="user-input-array-wrapper">
//               <input
//                 id="user-input-array"
//                 type="text"
//                 name="user-input-array"
//                 placeholder="Enter your array here (e.g. 1,2,3)"
//               />
//             </div>
//             <div id="button-wrapper">
//               <button type="submit" aria-label="Submit">
//                 <svg
//                   id="play-btn"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                   className="size-6"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </form>
//         </section>
//         <section className="item5">
//           <div id="controller-container">
//             <h2 id="controller-text">Controller</h2>
//           </div>
//           <button type="button" aria-label="Previous" id="previous-btn">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//               className="size-6"
//             >
//               <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
//             </svg>
//           </button>
//           <button type="button" aria-label="Next" id="next-btn">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//               className="size-6"
//             >
//               <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
//             </svg>
//           </button>
//         </section>
//       </div>
//     </main>
//   );
// }
