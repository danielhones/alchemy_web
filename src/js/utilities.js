// From this StackOverflow answer - http://stackoverflow.com/a/1063027/3199099
function sort_number(a, b) {
    return a - b;
}

function array_difference(a, b) {
    // Return array of elements that are a but not in b (a - b)
    // from this SO answer - http://stackoverflow.com/a/4026828/3199099
    return a.filter(function(i) { return b.indexOf(i) < 0; });
}

// Add cookie handler function

