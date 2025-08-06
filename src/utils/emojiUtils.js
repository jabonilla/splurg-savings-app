// Emoji mapping for different categories and merchants
export const getCategoryEmoji = (category) => {
  if (!category) return '🎯';
  
  const categoryLower = category.toLowerCase();
  
  switch (categoryLower) {
    case 'technology':
    case 'tech':
      return '💻';
    case 'travel':
    case 'vacation':
      return '✈️';
    case 'shopping':
    case 'retail':
      return '🛍️';
    case 'food':
    case 'dining':
    case 'food & dining':
      return '🍽️';
    case 'entertainment':
      return '🎬';
    case 'health':
    case 'fitness':
    case 'health & fitness':
      return '💪';
    case 'education':
      return '📚';
    case 'home':
    case 'garden':
    case 'home & garden':
      return '🏠';
    case 'gaming':
      return '🎮';
    case 'fashion':
      return '👗';
    case 'beauty':
      return '💄';
    case 'sports':
      return '⚽';
    case 'music':
      return '🎵';
    case 'art':
      return '🎨';
    case 'books':
      return '📖';
    case 'jewelry':
      return '💎';
    case 'cars':
    case 'automotive':
      return '🚗';
    case 'pets':
      return '🐕';
    case 'baby':
    case 'kids':
      return '👶';
    default:
      return '🎯';
  }
};

export const getMerchantEmoji = (merchant) => {
  if (!merchant) return '🏪';
  
  const merchantLower = merchant.toLowerCase();
  
  if (merchantLower.includes('starbucks') || merchantLower.includes('coffee')) {
    return '☕';
  } else if (merchantLower.includes('target') || merchantLower.includes('walmart')) {
    return '🛒';
  } else if (merchantLower.includes('amazon')) {
    return '📦';
  } else if (merchantLower.includes('uber') || merchantLower.includes('lyft')) {
    return '🚗';
  } else if (merchantLower.includes('netflix') || merchantLower.includes('spotify')) {
    return '📺';
  } else if (merchantLower.includes('mcdonalds') || merchantLower.includes('burger')) {
    return '🍔';
  } else if (merchantLower.includes('pizza')) {
    return '🍕';
  } else if (merchantLower.includes('gas') || merchantLower.includes('shell') || merchantLower.includes('exxon')) {
    return '⛽';
  } else if (merchantLower.includes('apple') || merchantLower.includes('iphone')) {
    return '📱';
  } else if (merchantLower.includes('nike') || merchantLower.includes('adidas')) {
    return '👟';
  } else if (merchantLower.includes('hotel') || merchantLower.includes('marriott')) {
    return '🏨';
  } else if (merchantLower.includes('airline') || merchantLower.includes('delta') || merchantLower.includes('united')) {
    return '✈️';
  } else if (merchantLower.includes('grocery') || merchantLower.includes('safeway') || merchantLower.includes('kroger')) {
    return '🛒';
  } else if (merchantLower.includes('pharmacy') || merchantLower.includes('cvs') || merchantLower.includes('walgreens')) {
    return '💊';
  } else if (merchantLower.includes('gym') || merchantLower.includes('fitness')) {
    return '💪';
  } else if (merchantLower.includes('movie') || merchantLower.includes('cinema')) {
    return '🎬';
  } else if (merchantLower.includes('restaurant')) {
    return '🍽️';
  } else {
    return '🏪';
  }
};

export const getGoalEmoji = (goalName) => {
  if (!goalName) return '🎯';
  
  const goalLower = goalName.toLowerCase();
  
  if (goalLower.includes('nike') || goalLower.includes('shoe') || goalLower.includes('sneaker')) {
    return '👟';
  } else if (goalLower.includes('trip') || goalLower.includes('vacation') || goalLower.includes('hawaii')) {
    return '✈️';
  } else if (goalLower.includes('phone') || goalLower.includes('iphone') || goalLower.includes('laptop')) {
    return '💻';
  } else if (goalLower.includes('car') || goalLower.includes('vehicle')) {
    return '🚗';
  } else if (goalLower.includes('house') || goalLower.includes('home')) {
    return '🏠';
  } else if (goalLower.includes('wedding')) {
    return '💒';
  } else if (goalLower.includes('baby') || goalLower.includes('child')) {
    return '👶';
  } else if (goalLower.includes('pet') || goalLower.includes('dog') || goalLower.includes('cat')) {
    return '🐕';
  } else if (goalLower.includes('jewelry') || goalLower.includes('ring')) {
    return '💎';
  } else if (goalLower.includes('watch')) {
    return '⌚';
  } else if (goalLower.includes('camera')) {
    return '📷';
  } else if (goalLower.includes('bike') || goalLower.includes('bicycle')) {
    return '🚲';
  } else if (goalLower.includes('game') || goalLower.includes('gaming')) {
    return '🎮';
  } else if (goalLower.includes('book') || goalLower.includes('education')) {
    return '📚';
  } else if (goalLower.includes('furniture')) {
    return '🪑';
  } else if (goalLower.includes('clothes') || goalLower.includes('fashion')) {
    return '👗';
  } else {
    return '🎯';
  }
};

// Available emojis for goal selection
export const availableEmojis = [
  '🎯', '💻', '✈️', '🛍️', '🍽️', '🎬', '💪', '📚', '🏠', '🎮', '👗', '💄', '⚽', '🎵', '🎨', '📖', '💎', '🚗', '🐕', '👶', '📱', '👟', '🏨', '🍔', '🍕', '⛽', '📺', '☕', '🛒', '📦', '💊', '🎭', '🎪', '🎢', '🎡', '🏖️', '🏄‍♂️', '🎿', '🏂', '🚴‍♂️', '🏃‍♂️', '🧘‍♀️', '🎯', '🎪', '🎨', '🎭', '🎪', '🎢', '🎡', '🏖️', '🏄‍♂️', '🎿', '🏂', '🚴‍♂️', '🏃‍♂️', '🧘‍♀️'
]; 