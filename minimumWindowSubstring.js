/*

Given two strings s and t, return the minimum window in s which will contain all the characters in t. If there is no such window in s that covers all characters in t, return the empty string "".

Note that If there is such a window, it is guaranteed that there will always be only one unique minimum window in s.


  Example 1:
  Input: s = "ADOBECODEBANC", t = "ABC"
  Output: "BANC"

  Example 2:
  Input: s = "a", t = "a"
  Output: "a"


Constraints:
1 <= s.length, t.length <= 105
s and t consist of English letters.


Follow up: Could you find an algorithm that runs in O(n) time?

Input: @param {string} s
       @param {string} t
Output: @return {string}

*/

var minWindow = function(s, t) {
  // get mapT, countT
  // left, right of substr window
  // when formed !== countT, right++
  // when formed === countT, track min, left++

  let left = 0, right = 0, mapT={}, map={}, countT = 0;

  if (s.length < t.length) {
    return "";
  }

  for (var i = 0; i < t.length; i++) {
    let char = t[i];
    if (mapT[char] === undefined) {
      mapT[char] = 1;
      countT++;
    } else {
      mapT[char]++;
    }
  }

  let formed = 0;
  let min = [0, s.length-1, Number.MAX_SAFE_INTEGER]; // left, right, length

  while (right < s.length) {
    let char = s[right];
    if (map[char] === undefined) {
      map[char] = 1;
    } else {
      map[char]++;
    }

    if (mapT[char] && mapT[char] === map[char]) {
      formed++;
    }

    // when formed
    while (formed === countT && left <= right) {
      let charLeft = s[left];
      // update min here
      if ((right - left + 1) < min[2]) {
        min = [left, right, right - left+1];
      }

      map[charLeft]--;
      if (mapT[charLeft] && map[charLeft] < mapT[charLeft]) {
        formed--;
      }
      left++;
    }
    right++;
  }
  if (min[2] === Number.MAX_SAFE_INTEGER) {
    return "";
  }

  return s.substring(min[0], min[1]+1);
};