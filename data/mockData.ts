export const mockBooks = [
  {
    id: 1,
    title: 'The Constitution of India',
    sections: 395,
    progress: 45,
    lastAccessed: '2025-04-10T10:30:00',
    lastUpdated: '2025-03-15T00:00:00',
    isPinned: true,
    isNew: false
  },
  {
    id: 2,
    title: 'Indian Penal Code, 1860',
    sections: 511,
    progress: 22,
    lastAccessed: '2025-04-12T14:20:00',
    lastUpdated: '2025-02-10T00:00:00',
    isPinned: true,
    isNew: false
  },
  {
    id: 3,
    title: 'Code of Criminal Procedure, 1973',
    sections: 484,
    progress: 10,
    lastAccessed: '2025-04-08T09:15:00',
    lastUpdated: '2025-01-20T00:00:00',
    isPinned: false,
    isNew: false
  },
  {
    id: 4,
    title: 'Indian Evidence Act, 1872',
    sections: 167,
    progress: 65,
    lastAccessed: '2025-04-11T16:45:00',
    lastUpdated: '2025-03-05T00:00:00',
    isPinned: false,
    isNew: false
  },
  {
    id: 5,
    title: 'Civil Procedure Code, 1908',
    sections: 158,
    progress: 5,
    lastAccessed: '2025-04-09T11:20:00',
    lastUpdated: '2025-02-25T00:00:00',
    isPinned: false,
    isNew: false
  },
  {
    id: 6,
    title: 'Information Technology Act, 2000',
    sections: 94,
    progress: 0,
    lastAccessed: '2025-04-07T15:30:00',
    lastUpdated: '2025-03-30T00:00:00',
    isPinned: false,
    isNew: true
  },
  {
    id: 7,
    title: 'Companies Act, 2013',
    sections: 470,
    progress: 8,
    lastAccessed: '2025-04-05T10:10:00',
    lastUpdated: '2025-03-28T00:00:00',
    isPinned: false,
    isNew: true
  }
];

export const mockSections = [
  {
    id: 101,
    bookId: 1,
    title: 'Article 1: Name and territory of the Union',
    description: 'Defines the name and territories of India.',
    content: 'भारत, अर्थात् इंडिया, राज्यों का एक संघ होगा। राज्य और उनके राज्यक्षेत्र वे होंगे जो पहली अनुसूची में विनिर्दिष्ट हैं। राज्यक्षेत्र में ऐसे राज्यक्षेत्र सम्मिलित होंगे जो इस संविधान के प्रारंभ के पश्चात् अधिग्रहित किए जाएं।\n\nIndia, that is Bharat, shall be a Union of States. The States and the territories thereof shall be as specified in the First Schedule. The territory of India shall comprise the territories of the States and the Union territories specified in the First Schedule and such other territories as may be acquired.',
    isFavorite: true
  },
  {
    id: 102,
    bookId: 1,
    title: 'Article 2: Admission or establishment of new States',
    description: 'Parliament may by law admit into the Union, or establish, new States.',
    content: 'संसद् विधि द्वारा ऐसे निबंधनों और शर्तों पर, जिन्हें वह ठीक समझे, भारत संघ में नए राज्यों का प्रवेश या उनकी स्थापना कर सकेगी।\n\nParliament may by law admit into the Union, or establish, new States on such terms and conditions as it thinks fit.',
    isFavorite: false
  },
  {
    id: 103,
    bookId: 1,
    title: 'Article 3: Formation of new States and alteration of areas, boundaries or names of existing States',
    description: 'Procedures for creating new states or changing existing ones.',
    content: 'संसद् विधि द्वारा\n(क) किसी राज्य से उसका राज्यक्षेत्र अलग करके अथवा दो या अधिक राज्यों को या राज्यों के भागों को मिलाकर अथवा किसी राज्यक्षेत्र को किसी राज्य के भाग के साथ मिलाकर, नए राज्य का निर्माण कर सकेगी;\n(ख) किसी राज्य का क्षेत्र बढ़ा सकेगी;\n(ग) किसी राज्य का क्षेत्र घटा सकेगी;\n(घ) किसी राज्य की सीमाओं में परिवर्तन कर सकेगी;\n(ङ) किसी राज्य के नाम में परिवर्तन कर सकेगी:\n\nParliament may by law—\n(a) form a new State by separation of territory from any State or by uniting two or more States or parts of States or by uniting any territory to a part of any State;\n(b) increase the area of any State;\n(c) diminish the area of any State;\n(d) alter the boundaries of any State;\n(e) alter the name of any State:',
    isFavorite: true
  },
  {
    id: 201,
    bookId: 2,
    title: 'Section 1: Title and extent of operation of the Code',
    description: 'Defines the title and extent of the Indian Penal Code.',
    content: 'यह अधिनियम भारतीय दंड संहिता कहलाएगा। इस संहिता का विस्तार जम्मू-कश्मीर राज्य के सिवाय संपूर्ण भारत पर है।\n\nThis Act shall be called the Indian Penal Code, and shall extend to the whole of India except the State of Jammu and Kashmir.',
    isFavorite: false
  },
  {
    id: 202,
    bookId: 2,
    title: 'Section 2: Punishment of offences committed within India',
    description: 'Every person shall be liable to punishment under this Code.',
    content: 'भारत के राज्यक्षेत्र में किए गए हर अपराध के लिए हर व्यक्ति इस संहिता के उपबंधों के अधीन, और किसी अन्य तत्समय प्रवृत्त विधि के उपबंधों के अधीन, दंडित किया जाएगा, न कि अन्यथा।\n\nEvery person shall be liable to punishment under this Code and not otherwise for every act or omission contrary to the provisions thereof, of which he shall be guilty within the territory of India.',
    isFavorite: true
  },
  {
    id: 203,
    bookId: 2,
    title: 'Section 3: Punishment of offences committed beyond, but which by law may be tried within, India',
    description: 'Any person liable to be tried for an offence committed beyond India.',
    content: 'कोई भी व्यक्ति, भारत के बाहर किए गए किसी ऐसे अपराध के लिए इस संहिता के अधीन दंड का भागी होगा, जो अपराध यदि भारत के अंदर किया जाता तो वह इस संहिता के अधीन दंडनीय होता, और ऐसा व्यक्ति ऐसे अपराध के लिए भारत में इस प्रकार दोषसिद्ध और दंडित किया जा सकेगा मानो ऐसा कार्य या लोप भारत में किया गया था।\n\nAny person liable, by any Indian law, to be tried for an offence committed beyond India shall be dealt with according to the provisions of this Code for any act committed beyond India in the same manner as if such act had been committed within India.',
    isFavorite: false
  }
];

export const mockFavorites = [
  {
    id: 101,
    title: 'Article 1: Name and territory of the Union',
    bookTitle: 'The Constitution of India'
  },
  {
    id: 103,
    title: 'Article 3: Formation of new States and alteration of areas, boundaries or names of existing States',
    bookTitle: 'The Constitution of India'
  },
  {
    id: 202,
    title: 'Section 2: Punishment of offences committed within India',
    bookTitle: 'Indian Penal Code, 1860'
  }
];

export const mockTags = [
  {
    id: 1,
    name: 'Important',
    color: '#FF6B6B',
    sections: [
      {
        id: 101,
        title: 'Article 1: Name and territory of the Union',
        bookTitle: 'The Constitution of India'
      },
      {
        id: 202,
        title: 'Section 2: Punishment of offences committed within India',
        bookTitle: 'Indian Penal Code, 1860'
      }
    ]
  },
  {
    id: 2,
    name: 'For Exam',
    color: '#4294ff',
    sections: [
      {
        id: 103,
        title: 'Article 3: Formation of new States and alteration of areas, boundaries or names of existing States',
        bookTitle: 'The Constitution of India'
      },
      {
        id: 202,
        title: 'Section 2: Punishment of offences committed within India',
        bookTitle: 'Indian Penal Code, 1860'
      },
      {
        id: 203,
        title: 'Section 3: Punishment of offences committed beyond, but which by law may be tried within, India',
        bookTitle: 'Indian Penal Code, 1860'
      }
    ]
  },
  {
    id: 3,
    name: 'Reference',
    color: '#10B981',
    sections: [
      {
        id: 102,
        title: 'Article 2: Admission or establishment of new States',
        bookTitle: 'The Constitution of India'
      }
    ]
  }
];