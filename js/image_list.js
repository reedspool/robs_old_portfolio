// Dev note: GLOBAL SCOPE! Better way, there must be.

// Here is the list of all the projects. It defines the order that the 
//   slideshow will follow. For example, the calendar project will start
//   by displaying 'calendar1.jpg' from the imgs folder.
PROJECT_LIST = 
{
  'calendar' : ['calendar1.jpg', 'calendar2.jpg', 'calendar3.jpg'],
  'guide'    : ['guide1.jpg', 'guide2.jpg', 'guide3.jpg', 'guide4.jpg', 'guide5.jpg', 'guide6.jpg', 'guide7.jpg', 'guide8.jpg', 'guide9.jpg'], 
  'kh'       : ['kh1.jpg', 'kh2.jpg'],
  'k8h'      : ['k8h1.jpg', 'k8h2.jpg'],
  'oel'      : ['oel1.jpg', 'oel2.jpg'],
  'os'       : ['os2.jpg', 'os1.jpg'],
  'post'     : ['post1.jpg', 'post2.jpg', 'post3.jpg', 'post4.jpg', 'post5.jpg', 'post6.jpg'],
  'sg'       : ['sg1.jpg', 'sg2.jpg'],
  'sp'       : ['sp1.jpg', 'sp2.jpg', 'sp3.jpg', 'sp4.jpg', 'sp5.jpg'],
  'stamp'    : ['stamp1.jpg', 'stamp2.jpg', 'stamp3.jpg'],
  'yk'       : ['yk1.jpg', 'yk2.jpg'],
  'schwag'   : ['schwag1.jpg', 'schwag2.jpg']
};

// This defines how the projects are sorted on the page. For example,
//   first comes a row containing the projects 'calendar' and 'schwag'. 
//
//  The first image to be displayed will be the first item in the list above.
//   

PROJECT_ORDER = 
[
  ['calendar', 'schwag'],
  'guide',
  ['k8h', 'stamp'],
  'kh',
  ['oel', 'os'],
  'yk',
  'sp',
  ['post', 'sg']
];