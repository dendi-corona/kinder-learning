// Simple picture stories for babies and toddlers (ages 2+)

export interface StoryPage {
  text: string;
  illustrationPrompt: string;
}

export interface BabyStory {
  id: string;
  title: string;
  emoji: string;
  color: string;
  pages: StoryPage[];
  quiz?: {
    question: string;
    options: string[];
    correct: number;
  }[];
  ageRange: string;
}

export const babyStories: BabyStory[] = [
  {
    id: 'hungry-caterpillar',
    title: 'The Very Hungry Caterpillar',
    emoji: '🐛',
    color: 'bg-kid-green',
    ageRange: '2-4',
    pages: [
      {
        text: 'In the moonlight, a tiny egg sleeps on a leaf.',
        illustrationPrompt: 'small white egg on green leaf, night sky with moon, simple peaceful illustration for babies',
      },
      {
        text: 'The sun wakes up the little caterpillar!',
        illustrationPrompt: 'cute baby caterpillar hatching from egg, bright sun, cheerful morning scene',
      },
      {
        text: 'He is very hungry and looks for food.',
        illustrationPrompt: 'hungry caterpillar crawling, looking for food, simple colorful illustration',
      },
      {
        text: 'On Monday, he eats one red apple.',
        illustrationPrompt: 'caterpillar eating red apple, simple fruit, bright colors',
      },
      {
        text: 'On Tuesday, he eats two green pears.',
        illustrationPrompt: 'caterpillar with two pears, green fruits, happy caterpillar',
      },
      {
        text: 'On Wednesday, he eats three purple plums.',
        illustrationPrompt: 'three plums, caterpillar eating, colorful fruits',
      },
      {
        text: 'But he still has a tummy ache!',
        illustrationPrompt: 'caterpillar holding tummy, not feeling well, simple expression',
      },
      {
        text: 'He eats a green leaf and feels better.',
        illustrationPrompt: 'caterpillar eating green leaf, feeling better, happy again',
      },
      {
        text: 'He builds a cozy cocoon around himself.',
        illustrationPrompt: 'caterpillar in brown cocoon, sleeping peacefully',
      },
      {
        text: 'He comes out as a beautiful butterfly!',
        illustrationPrompt: 'colorful butterfly emerging, wings spread, magical transformation',
      },
    ],
    quiz: [
      {
        question: 'What did the caterpillar become?',
        options: ['A bee', 'A butterfly', 'A bird'],
        correct: 1,
      },
      {
        question: 'What color was the apple?',
        options: ['Red', 'Blue', 'Green'],
        correct: 0,
      },
    ],
  },
  {
    id: 'goodnight-moon',
    title: 'Goodnight Moon',
    emoji: '🌙',
    color: 'bg-kid-purple',
    ageRange: '1-3',
    pages: [
      {
        text: 'In the great green room, everything is quiet.',
        illustrationPrompt: 'cozy green bedroom at night, soft lighting, peaceful scene',
      },
      {
        text: 'There is a telephone and a red balloon.',
        illustrationPrompt: 'old telephone and red balloon in room, simple objects',
      },
      {
        text: 'There is a picture of the moon.',
        illustrationPrompt: 'picture frame with moon on wall, bedroom scene',
      },
      {
        text: 'Goodnight room, goodnight moon.',
        illustrationPrompt: 'moon shining through window, peaceful night',
      },
      {
        text: 'Goodnight bears and goodnight chairs.',
        illustrationPrompt: 'teddy bears and chairs in room, cozy bedtime',
      },
      {
        text: 'Goodnight kittens and goodnight mittens.',
        illustrationPrompt: 'sleepy kittens and mittens, soft and cuddly',
      },
      {
        text: 'Goodnight stars, goodnight air.',
        illustrationPrompt: 'stars in night sky, peaceful bedroom',
      },
      {
        text: 'Goodnight noises everywhere.',
        illustrationPrompt: 'quiet room, everything sleeping, peaceful end',
      },
    ],
    quiz: [
      {
        question: 'What color was the balloon?',
        options: ['Blue', 'Red', 'Yellow'],
        correct: 1,
      },
    ],
  },
  {
    id: 'brown-bear',
    title: 'Brown Bear, Brown Bear',
    emoji: '🐻',
    color: 'bg-kid-orange',
    ageRange: '1-3',
    pages: [
      {
        text: 'Brown bear, brown bear, what do you see?',
        illustrationPrompt: 'friendly brown bear, simple and cute, looking at viewer',
      },
      {
        text: 'I see a red bird looking at me.',
        illustrationPrompt: 'red bird flying, colorful, friendly',
      },
      {
        text: 'Red bird, red bird, what do you see?',
        illustrationPrompt: 'red bird looking at something, curious',
      },
      {
        text: 'I see a yellow duck looking at me.',
        illustrationPrompt: 'yellow duck swimming, happy and cute',
      },
      {
        text: 'Yellow duck, yellow duck, what do you see?',
        illustrationPrompt: 'duck looking at next animal',
      },
      {
        text: 'I see a blue horse looking at me.',
        illustrationPrompt: 'blue horse, magical and colorful, friendly',
      },
      {
        text: 'All the animals are looking at you!',
        illustrationPrompt: 'all animals together, bear bird duck horse, group picture',
      },
    ],
    quiz: [
      {
        question: 'What color was the bird?',
        options: ['Blue', 'Red', 'Green'],
        correct: 1,
      },
    ],
  },
  {
    id: 'puppy-home',
    title: 'Puppy Looks for Home',
    emoji: '🐕',
    color: 'bg-kid-pink',
    ageRange: '2-4',
    pages: [
      {
        text: 'A little puppy is all alone.',
        illustrationPrompt: 'cute sad puppy sitting alone, simple and sympathetic',
      },
      {
        text: 'He walks down the street looking for a home.',
        illustrationPrompt: 'puppy walking on sidewalk, exploring',
      },
      {
        text: 'He sees a big dog house.',
        illustrationPrompt: 'large dog house, puppy looking at it',
      },
      {
        text: 'It is too big for a little puppy!',
        illustrationPrompt: 'puppy next to huge dog house, size comparison',
      },
      {
        text: 'He sees a cozy little bed.',
        illustrationPrompt: 'small cozy dog bed, warm and inviting',
      },
      {
        text: 'A kind family welcomes him!',
        illustrationPrompt: 'happy family petting puppy, welcoming home',
      },
      {
        text: 'Now puppy has a loving home!',
        illustrationPrompt: 'puppy sleeping in bed, happy and safe',
      },
    ],
    quiz: [
      {
        question: 'What was the puppy looking for?',
        options: ['Food', 'A home', 'A toy'],
        correct: 1,
      },
    ],
  },
  {
    id: 'balloon-adventure',
    title: 'The Balloon\'s Adventure',
    emoji: '🎈',
    color: 'bg-kid-blue',
    ageRange: '2-4',
    pages: [
      {
        text: 'A red balloon floats up, up, up!',
        illustrationPrompt: 'red balloon floating in sky, cheerful adventure begins',
      },
      {
        text: 'It flies over the trees.',
        illustrationPrompt: 'balloon above green trees, aerial view',
      },
      {
        text: 'It waves to the birds.',
        illustrationPrompt: 'balloon and birds flying together, friendly',
      },
      {
        text: 'It sees the big blue ocean.',
        illustrationPrompt: 'balloon over ocean, water below, beautiful view',
      },
      {
        text: 'The wind blows the balloon higher.',
        illustrationPrompt: 'balloon going higher in sky, wind blowing',
      },
      {
        text: 'It lands gently in a child\'s hand.',
        illustrationPrompt: 'balloon landing in child\'s hand, happy reunion',
      },
      {
        text: 'Now the balloon has a new friend!',
        illustrationPrompt: 'child holding balloon, both happy together',
      },
    ],
    quiz: [
      {
        question: 'What color was the balloon?',
        options: ['Blue', 'Red', 'Yellow'],
        correct: 1,
      },
    ],
  },
  {
    id: 'sleepy-bunny',
    title: 'Sleepy Bunny',
    emoji: '🐰',
    color: 'bg-kid-purple',
    ageRange: '1-3',
    pages: [
      {
        text: 'Sleepy bunny rubs his eyes.',
        illustrationPrompt: 'cute bunny rubbing eyes, tired, bedtime',
      },
      {
        text: 'He is looking for his bed.',
        illustrationPrompt: 'bunny hopping, looking for bed',
      },
      {
        text: 'He finds his soft cozy burrow.',
        illustrationPrompt: 'cozy bunny burrow underground, warm and soft',
      },
      {
        text: 'He puts on his pajamas.',
        illustrationPrompt: 'bunny in cute pajamas, getting ready for bed',
      },
      {
        text: 'He hugs his teddy bear.',
        illustrationPrompt: 'bunny hugging teddy bear, sweet moment',
      },
      {
        text: 'Sleepy bunny closes his eyes.',
        illustrationPrompt: 'bunny sleeping peacefully, dreams',
      },
      {
        text: 'Goodnight, sleepy bunny!',
        illustrationPrompt: 'bunny fast asleep, peaceful night, stars outside',
      },
    ],
    quiz: [
      {
        question: 'What animal is sleepy?',
        options: ['A cat', 'A bunny', 'A dog'],
        correct: 1,
      },
    ],
  },
  {
    id: 'rainbow-colors',
    title: 'Rainbow Colors',
    emoji: '🌈',
    color: 'bg-kid-pink',
    ageRange: '1-3',
    pages: [
      {
        text: 'Red is the color of apples.',
        illustrationPrompt: 'red apples, simple red objects, bright',
      },
      {
        text: 'Orange is the color of oranges!',
        illustrationPrompt: 'orange fruits, cheerful orange color',
      },
      {
        text: 'Yellow is the color of the sun.',
        illustrationPrompt: 'bright yellow sun, sunny day',
      },
      {
        text: 'Green is the color of grass.',
        illustrationPrompt: 'green grass, nature scene',
      },
      {
        text: 'Blue is the color of the sky.',
        illustrationPrompt: 'blue sky, clear day',
      },
      {
        text: 'Purple is the color of grapes.',
        illustrationPrompt: 'purple grapes, cluster of grapes',
      },
      {
        text: 'All the colors make a rainbow!',
        illustrationPrompt: 'beautiful rainbow with all colors, magical',
      },
    ],
    quiz: [
      {
        question: 'What color is the sun?',
        options: ['Yellow', 'Blue', 'Red'],
        correct: 0,
      },
    ],
  },
  {
    id: 'counting-ducklings',
    title: 'Counting Ducklings',
    emoji: '🦆',
    color: 'bg-kid-yellow',
    ageRange: '2-4',
    pages: [
      {
        text: 'One little duckling swims alone.',
        illustrationPrompt: 'single duckling swimming, number 1',
      },
      {
        text: 'Two ducklings swim together.',
        illustrationPrompt: 'two ducklings, number 2',
      },
      {
        text: 'Three ducklings quack and play.',
        illustrationPrompt: 'three ducklings playing, number 3',
      },
      {
        text: 'Four ducklings follow mommy.',
        illustrationPrompt: 'four ducklings with mom, number 4',
      },
      {
        text: 'Five ducklings make a line!',
        illustrationPrompt: 'five ducklings in row, number 5',
      },
      {
        text: 'All five ducklings are happy!',
        illustrationPrompt: 'all five ducklings together, happy family',
      },
    ],
    quiz: [
      {
        question: 'How many ducklings at the end?',
        options: ['Three', 'Five', 'Two'],
        correct: 1,
      },
    ],
  },
];

export function getStoryById(id: string): BabyStory | undefined {
  return babyStories.find(story => story.id === id);
}

export function getRandomStory(): BabyStory {
  const randomIndex = Math.floor(Math.random() * babyStories.length);
  return babyStories[randomIndex];
}
