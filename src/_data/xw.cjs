module.exports = () => {
  return [
    {
      link: 'https://www.nytimes.com/crosswords/game/daily/2025/06/15',
      publication: "The New York Times",
      published: new Date('June 15, 2025'),
      constructors: ['Adam Wagner', 'Rebecca Goldstein'],
      themed: true,
      theme_revealer: [
        { clue: 'How a shirt might be put on in a rush ... or a hint to this puzzle\'s theme', answer: 'INSIDE OUT AND BACKWARDS' },
      ],
      theme_explanation: 'The first half of the themed clue gives the literal answer. ' + 
        'If you reverse the answer (BACKWARDS) and remove the circled letter (take the INSIDE OUT), ' +
        'you get the answer to the second half of the clue. Most of the themed clues also happened to ' +
        'be my favorite clues, but here\'s one that didn\'t make the cut: ' +
        'clue: Offerings from Healthline / Roasting on an open fire, maybe. ' +
        'The answer is DIET TIPS, with the I in DIET circled. DIET TIPS -> DETTIPS -> SPITTED. ' + 
        'Pretty clever, right? I will say that I had a particular fondness for this theme as a member ' +
        'of the National Puzzlers\' League. It wasn\'t a particularly difficult puzzle, but that\'s not ' +
        'what makes a puzzle stand out to me. This was an immense joy to solve and made me want to tell other people about it immediately.',
      favorite_clues: [
        { clue: 'What a flipping tool!', answer: 'SPATULA' },
        { clue: 'Device used to clear out nasal passages / Final part of a radio countdown', answer: 'NET(I)POT' },
        { clue: 'Brunch entrees / Figure with an eponymous fire', answer: 'OM(E)LETS' },
        { clue: 'Genetic repositories / Reel Big Fish or Sublime', answer: 'DNABA(N)KS' },
        { clue: 'Hit 1981 German-language film / "What a shame!"', answer: 'DA(S)BOOT' },
        { clue: 'Women abroad / Wrapped garments', answer: 'S(I)GNORAS' },
        { clue: 'Pioneer in Modernist poetry / Throne', answer: 'T(S)ELIOT' },
        { clue: 'Comparatively upper-crust, in a way / Wood cutter', answer: 'WASPI(E)R' },
        { clue: 'University whose name sounds like a kind of highway', answer: 'TULANE' },
      ]
    }
  ]
}