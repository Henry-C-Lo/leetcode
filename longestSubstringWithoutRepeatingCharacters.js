/*

Longest Substring Without Repeating Characters
Given a string s, find the length of the longest substring without repeating characters.

  Example 1:
  Input: s = "abcabcbb"
  Output: 3
  Explanation: The answer is "abc", with the length of 3.

  Example 2:
  Input: s = "bbbbb"
  Output: 1
  Explanation: The answer is "b", with the length of 1.

  Example 3:
  Input: s = "pwwkew"
  Output: 3
  Explanation: The answer is "wke", with the length of 3.
  Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

  Example 4:
  Input: s = ""
  Output: 0

Constraints:
0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.

Input:  @param {string} s
Output:  @return {number}

*/

// sliding window solution

var lengthOfLongestSubstring = function (s) {
  let left = 0, right = 0, maxLength = 0;
  let set = new Set();

  while (right < s.length) {
    let char = s[right];
    // ff s[right] has not been seen yet
    if (!set.has(char)) {
      // add char to the set
      set.add(char);
      // increase size of window to right
      right++;
      // update max length; set.size represents length of unique substring
      maxLength = Math.max(maxLength, set.size);
    } else {
      // we've seen s[right] so we need to shrink the window
      // delete s[left] from set
      set.delete(s[left]);
      // shrink window from left
      left++;
    }
  }

  return maxLength;
};
