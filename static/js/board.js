/**
 * @author xsir317@gmail.com
 * @license http://creativecommons.org/licenses/by-sa/3.0/deed.zh
 */

function convertsinglepos(pos) {
	if(pos.length < 2 || pos.length > 3) {
	  return null;
	}
	var n1 = 0;
	var n2 = 0;
	if(pos.length == 2) {
	  n1 = pos[0].charCodeAt() - 'a'.charCodeAt() + 1;
	  n2 = pos[1].charCodeAt() - '1'.charCodeAt() + 1;
	  if (n1 < 1 || n1 > 15 || n2 < 1 || n2 > 9) {
		return null;
	  }
	}
	else if(pos.length == 3) {
	  n1 = pos[0].charCodeAt() - 'a'.charCodeAt() + 1;
	  var n21 = pos[1].charCodeAt() - '0'.charCodeAt();
	  var n22 = pos[2].charCodeAt() - '0'.charCodeAt();
	  if (n1 < 1 || n1 > 15 || n21 != 1 || n22 < 0 || n22 > 5) {
		return null;
	  }
	  n2 = n21 * 10 + n22;
	}
	return n2.toString(16) + n1.toString(16);
  }
  
  function convertpos(pos) {
	var m = pos.match(/[a-o][0-9]+/g);
	if (!m) {
		return '';
	}
	var l = 0;
	for (i = 0; i < m.length; i ++) {
	  l += m[i].length;
	}
	if (l != pos.length) {
	  return '';
	}
	for (i = 0; i < m.length; i ++) {
	  for (j = i + 1; j < m.length; j ++) {
		if (m[i] == m[j]) {
		  return '';
		}
	  }
	}
	var ret = '';
	for (i = 0; i < m.length; i ++) {
	  var r = convertsinglepos(m[i]);
	  if(r == null) {
		return '';
	  }
	  ret += r;
	}
	return ret;
  }
  
  function convertchars(chars) {
	var m = chars.match(/[a-o][0-9]+[0-9A-Z]/g);
	if (!m) {
		return '';
	}
	var l = 0;
	for (i = 0; i < m.length; i ++) {
	  l += m[i].length;
	}
	if (l != chars.length) {
	  return '';
	}
	for (i = 0; i < m.length; i ++) {
	  for (j = i + 1; j < m.length; j ++) {
		if (m[i].substring(0, m[i].length - 1) == m[j].substring(0, m[j].length - 1)) {
		  return '';
		}
	  }
	}
	ret = '';
	for (i = 0; i < m.length; i ++) {
	  var r = convertsinglepos(m[i].substring(0, m[i].length - 1));
	  var label = m[i][m[i].length - 1];
	  if(r == null) {
		return '';
	  }
	  ret += r + label;
	}
	return ret;
  }
  
  function doublecheck(pos, chars) {
	var apos = pos.match(/[a-o][0-9]+/g);
	var achars = chars.match(/[a-o][0-9]+[0-9A-Z]/g);
	if((! apos) || (! achars)) {
		return 1;
	}
	for (i = 0; i < apos.length; i ++) {
	  for (j = 0; j < achars.length; j ++) {
		if (apos[i] == achars[j].substring(0, achars[j].length - 1)) {
		  return 0;
		}
	  }
	}
	return 1;
  }
  
  function lib_convertsinglepos(pos, bias = 0) {
	  if(pos.length != 2) {
		return null;
	  }
	  if(bias) {
		  var n2 = parseInt(pos[0], 16) - 1;
		  var n1 = parseInt(pos[1], 16) - 1;
	  }
	  else {
		  var n1 = parseInt(pos[0], 16);
		  var n2 = parseInt(pos[1], 16);
	  }
	  if (n1 < 0 || n1 > 14 || n2 < 0 || n2 > 14) {
		  return null;
	  }
	  return [n1, n2];
  }
  
  function lib_convertbestline(bestline) {
	  var ret = [];
	  for (i = 0; i < bestline.length / 2; i ++) {
		var r = lib_convertsinglepos(bestline.substr(i * 2, 2));
		ret.push(r);
	  }
	  return ret;
  }
  
  function lib_game2board(pos) {
	var black_moves = [], white_moves = [];
	for (i = 0; i < pos.length / 2; i ++) {
	  var r = lib_convertsinglepos(pos.substr(i * 2, 2), 1);
	  if(i % 2 == 0) {
		black_moves.push(r);
	  }
	  else {
		white_moves.push(r);
	  }
	}
	return [black_moves, white_moves];
  }
  
  function lib_rotate_move(move, d) {
	  var px = move[0], py = move[1];
	  var q;
	  switch(d) {
		case 0:
		  q = [px, py]; break;
		case 1:
		  q = [14 - px, py]; break;
		case 2:
		  q = [px, 14 - py]; break;
		case 3:
		  q = [14 - px, 14 - py]; break;
		case 4:
		  q = [py, px]; break;
		case 5:
		  q = [py, 14 - px]; break;
		case 6:
		  q = [14 - py, px]; break;
		case 7:
		  q = [14 - py, 14 - px]; break;
	  }
	  return q;
  }
  
  function lib_board2str(board) {
	  var black_moves = board[0], white_moves = board[1];
	  var black_strs = []
	  for (i = 0; i < black_moves.length; i++) {
		black_strs.push(black_moves[i][0] + ',' + black_moves[i][1]);
	  }
	  black_strs = black_strs.join(';');
	  var white_strs = []
	  for (i = 0; i < white_moves.length; i++) {
		white_strs.push(white_moves[i][0] + ',' + white_moves[i][1]);
	  }
	  white_strs = white_strs.join(';');
	  return black_strs + '/' + white_strs
  }
  
  function lib_str2md5(d){result = M(V(Y(X(d),8*d.length)));return result.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
  
  function lib_pos2str(pos) {
	  var px = pos[0], py = pos[1];
	  return String.fromCharCode(px + 'A'.charCodeAt(0)) + (py + 1);
  }
  
  var lib_reverse_rotate = [0, 1, 2, 3, 4, 6, 5, 7];
  var lib_label_list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
		  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ];
		  
  function lib_cmp(a, b) {
	if(a[0] != b[0]) {
	  return a[0] - b[0];
	}
	else {
	  return a[1] - b[1];
	}
  }
  
  function lib_board_move(board, move) {
	new_board = JSON.parse(JSON.stringify(board));
	if (new_board[0].length == new_board[1].length) {
	  new_board[0].push(move);
	  new_board[0].sort(lib_cmp);
	}
	else {
	  new_board[1].push(move);
	  new_board[1].sort(lib_cmp);
	}
	return new_board;
  }
  
  function lib_cmp_board(a, b) {
	var cmpa = [], cmpb = [];
	for(var i = 0; i < 2; i ++) {
	  for(var j = 0; j < a[i].length; j ++)
	  {
		cmpa.push(a[i][j][0]);
		cmpa.push(a[i][j][1]);
		cmpb.push(b[i][j][0]);
		cmpb.push(b[i][j][1]);
	  }
	}
	for(var i = 0; i < cmpa.length; i ++) {
	  if(cmpa[i] != cmpb[i]) {
		return cmpa[i] - cmpb[i];
	  } 
	}
	return 0;
  }
  
  function lib_minimize_board(board) {
	var black_moves = board[0], white_moves = board[1];
	var min_board = null;
	var min_d = null;
	for(var d = 0; d < 8; d ++) {
	  new_black_moves = [];
	  new_white_moves = [];
	  for(var i = 0; i < black_moves.length; i ++) {
		new_black_moves.push(lib_rotate_move(black_moves[i], d));
	  }
	  for(var i = 0; i < white_moves.length; i ++) {
		new_white_moves.push(lib_rotate_move(white_moves[i], d));
	  }
	  new_black_moves.sort(lib_cmp);
	  new_white_moves.sort(lib_cmp);
	  cur_board = [new_black_moves, new_white_moves];
	  if(min_board == null || lib_cmp_board(cur_board, min_board) < 0) {
		min_board = cur_board;
		min_d = d;
	  }
	}
	return [min_board, min_d];
  }
  
  lib_label_map = {};
  for(var lib_i = 0; lib_i < 26; lib_i ++) {
	  lib_label_map[String.fromCharCode('a'.charCodeAt(0) + lib_i)] = lib_i;
	  lib_label_map[String.fromCharCode('A'.charCodeAt(0) + lib_i)] = lib_i + 26;
  }
  
  function lib_format(i, d) {
	  i = '' + i;
	  d = d - i.length;
	  d = d > 0 ? d : 0
	  i = ' '.repeat(d) + i;
	  return i;
	}
  
	function lib_activepos2chars(active_pos, pos_to_label_map) {
	  ret = '';
	  for(var i = 0; i < active_pos.length; i ++) {
		var pos = active_pos[i];
		var label = pos_to_label_map[pos];
		var strpos = (pos[1] + 1).toString(16) + (pos[0] + 1).toString(16) + label;
		ret += strpos;
	  }
	  return ret;
	}

function lib_tofixed(i) {
  var neg = 0;
  if(i < 0) {
    neg = 1;
    i = -i;
  }
  i = '' + i;
  if(i.length < 3) {
    i = '0'.repeat(3 - i.length) + i;
  }
  i = i.substring(0, i.length - 2) + '.' + i.substring(i.length - 2, i.length)
  if(neg) {
    i = '-' + i;
  }
  return i;
}

function lib_minimize_board_with_drift(board) {
	var black_moves = board[0], white_moves = board[1];
	var min_board = null;
  var min_drift = null;
	var min_d = null;
	for(var d = 0; d < 8; d ++) {
	  new_black_moves = [];
	  new_white_moves = [];
    var min_px = 15, min_py = 15;
	  for(var i = 0; i < black_moves.length; i ++) {
		new_black_moves.push(lib_rotate_move(black_moves[i], d));
	  }
	  for(var i = 0; i < white_moves.length; i ++) {
		new_white_moves.push(lib_rotate_move(white_moves[i], d));
	  }
    for(var i = 0; i < new_black_moves.length; i ++) {
      var px = new_black_moves[i][0];
      var py = new_black_moves[i][1];
      min_px = px < min_px ? px : min_px;
      min_py = py < min_py ? py : min_py;
    }
    for(var i = 0; i < new_white_moves.length; i ++) {
      var px = new_white_moves[i][0];
      var py = new_white_moves[i][1];
      min_px = px < min_px ? px : min_px;
      min_py = py < min_py ? py : min_py;
    }
    drift_black_moves = [];
	  drift_white_moves = [];
    for(var i = 0; i < new_black_moves.length; i ++) {
      var px = new_black_moves[i][0];
      var py = new_black_moves[i][1];
      drift_black_moves.push([px - min_px, py - min_py]);
    }
    for(var i = 0; i < new_white_moves.length; i ++) {
      var px = new_white_moves[i][0];
      var py = new_white_moves[i][1];
      drift_white_moves.push([px - min_px, py - min_py]);
    }
	  drift_black_moves.sort(lib_cmp);
	  drift_white_moves.sort(lib_cmp);
	  cur_board = [drift_black_moves, drift_white_moves];
	var cur_drift = min_px * 15 + min_py;
	  var cmp_board;
	  if(min_board != null) {
		  cmp_board = lib_cmp_board(cur_board, min_board);
	  }
	  if(min_board == null || cmp_board < 0 || (cmp_board == 0 && cur_drift < min_drift)) {
		min_board = cur_board;
    min_drift = cur_drift
		min_d = d;
	  }
	}
	return [min_board, min_drift, min_d];
  }

function lib_symmetric_minimize_board_with_drift(min_board_drift_1, min_board_drift_2) {
  var board_1 = min_board_drift_1[0];
  var board_2 = min_board_drift_2[0];
  var drift_1 = min_board_drift_1[1];
  var drift_2 = min_board_drift_2[1];
  if(lib_cmp_board(board_1, board_2) == 0) {
     if(drift_1 == drift_2) {
       return 2;
     }
     else {
       return 1;
     }
  }
  else {
    return 0;
  }
}
  
  var getJSON = function(url, md5, callback) {
	  var xhr = new XMLHttpRequest();
	  xhr.open('GET', url, true);
	  xhr.responseType = 'json';
	  xhr.onload = function() {
		var status = xhr.status;
		if (status === 200) {
		  callback(null, md5, xhr.response);
		} else {
		  callback(status, md5, xhr.response);
		}
	  };
	  xhr.send();
  };

  var lib_last_md5;
  
  function lib_getlib(currgame, boardobj) {
	  var cur_board = lib_game2board(currgame);
	  var min_board = lib_minimize_board(cur_board);
	  cur_board = min_board[0];
	  var cur_board_d= min_board[1];
	  var cur_board_md5 = lib_str2md5(lib_board2str(cur_board));
	  lib_last_md5 = cur_board_md5;
	  var md5_key1 = cur_board_md5.substr(0, 2);
	  var md5_key2 = cur_board_md5.substr(24, 8);
	
	  var active_pos = [];
	  var pos_id_count = 0;
	  var prints = [];
	  var json_url = '/renju_js/22/' + md5_key1 + '.json'
	  var renjuliboutput = document.getElementById('renjuliboutput');
	  renjuliboutput.innerHTML = 'Searching in the database...';
	  getJSON(json_url, cur_board_md5, function(err, md5, data) {
		  if (md5 != lib_last_md5) {
			  return;
		  }
		  if (err !== null) {
				  renjuliboutput.innerHTML = 'Failed to load the library.';
			  }
			  else {
				  var pos_to_label_map = {};
				  if(md5_key2 in data) {
					  var results = data[md5_key2];
					  var pos_to_min_board_drift_map = {};
					  for(var i = 0; i < results.length; i ++) {
						var result = results[i];
						var pos = lib_convertsinglepos(result[0]);
						var next_value = result[1];
						var depth = result[2];
						var next_bestline = lib_convertbestline(result[3]);
						var in_net = result[4];
						var keep_min_pos = pos;
						pos = lib_rotate_move(pos, lib_reverse_rotate[cur_board_d])
						var new_bestline = [];
						for(var j = 0; j < next_bestline.length; j ++) {
						  new_bestline.push(lib_rotate_move(next_bestline[j], lib_reverse_rotate[cur_board_d]));
						}
						next_bestline = new_bestline;
						if(in_net) {
						  var next_board = lib_board_move(cur_board, keep_min_pos);
						  var next_board_with_drift = lib_minimize_board_with_drift(next_board);
						  var max_sym = 0;
						  var max_sym_pos = null;
						  Object.keys(pos_to_min_board_drift_map).forEach(function(the_pos) {
							var the_board_with_drift = pos_to_min_board_drift_map[the_pos];
							var sym = lib_symmetric_minimize_board_with_drift(next_board_with_drift, the_board_with_drift);
							if(sym > max_sym) {
								max_sym = sym;
								max_sym_pos = the_pos;
							}
						  });
						  if(max_sym == 1 && cur_board[0].length + cur_board[1].length != 4) {
							  max_sym = 0;
						  }
						  if(max_sym > 0) {
							pos_to_label_map[pos] = pos_to_label_map[max_sym_pos];
							if(max_sym == 1) {
								pos_to_label_map[pos] += '\'';
							}
						  }
						  else {
							pos_to_label_map[pos] = lib_label_list[pos_id_count];
							pos_to_min_board_drift_map[pos] = next_board_with_drift;
							pos_id_count += 1;
						  }
						  active_pos.push(pos);
						}
						if(cur_board[0].length + cur_board[1].length >= 4) {
						  var next_bestline_str = [];
						  for (var j = 0; j < next_bestline.length; j ++) {
							next_bestline_str.push(lib_pos2str(next_bestline[j]));
						  }
						  next_bestline_str = next_bestline_str.join(' ');
						  if(cur_board[0].length > cur_board[1].length) {
							next_value = - next_value;
						  }
						  if(pos in pos_to_label_map) {
							prints.push([pos_to_label_map[pos], lib_pos2str(pos), next_value, depth, next_bestline_str]);
						  }
						  else {
							prints.push(['', lib_pos2str(pos), next_value, depth, next_bestline_str]);
						  }
						}
					  }
				  }
				  else {
					  prints = [];
					  active_pos = [];
					  if(cur_board[0].length + cur_board[1].length == 0) {
						  active_pos = [[7, 7]];
						  pos_to_label_map[active_pos[0]] = 'a';
					  }
				  }
				  print_str = ''
				  for(var i = 0; i < prints.length; i ++) {
					  var cur_print = prints[i];
					  var cur_label = cur_print[0];
					  var cur_pos = lib_format(cur_print[1], 4);
					  var cur_next_value = lib_format(lib_tofixed(cur_print[2]), 8);
					  var cur_depth = lib_format(cur_print[3], 4);
					  var cur_bestline = cur_print[4];
					  print_str += (cur_label + '\t' + cur_pos + '\t' + cur_next_value + '\t' + cur_bestline + '\n');
				  }
				  if(print_str == '' && active_pos.length == 0) {
					  print_str = 'No information in this position.';
				  }
				  renjuliboutput.innerHTML = print_str;
				  active_pos_str = lib_activepos2chars(active_pos, pos_to_label_map);
				  boardobj.chars = active_pos_str;
				  boardobj.show_char();
			  }
			});
  }
  
  
  
  board = function (div)
  {
	  var boardobj = this;
	  var cur_game = div.attr('game');
	  var cur_chars;
	  var lib;
	  if (div.attr('lib') == 'true') {
		  lib = true;
	  }
	  else {
		  lib = false;
	  }
	  if (!cur_game.includes('/')) {
		  cur_chars = '';
	  }
	  else {
		  splitted = cur_game.split('/', 2);
		  cur_game = splitted[0];
		  cur_chars = splitted[1];
	  }
	  this.gameinit = convertpos(cur_game)
	  this.chars = convertchars(cur_chars);
	  if (this.gameinit && this.chars) {
		  if (!doublecheck(cur_game, cur_chars)) {
			  this.chars = '';
		  }
	  }
	  this.currgame = '';
	  this.endgame = '';
	  this.currcolor = 'black';
	  this.currstep = 1;
	  boardobj.Boardview = div;
	  boardobj.Boardview.html('');
	  boardobj.Boardview.mousedown(function(e){
		  if(e.which == 3)
		  {
			  boardobj.pre();
			  return false;
		  }
	  });
	  boardobj.Boardview.bind("contextmenu", function() { return false; }); 
	  this.getlib = function() {
		  if(lib) {
			  var currgame = boardobj.currgame;
			  lib_getlib(currgame, boardobj);
		  }
	  };
	  //根据endgame的记录，落下后面一手棋
	  this.next_nolib = function(){
		  if(boardobj.endgame != boardobj.currgame)
		  {
			  nextstep = boardobj.endgame.substr(boardobj.currgame.length,2);
			  nextstepcell = boardobj.Boardview.find('.'+nextstep);
			  nextstepcell.removeClass('blank').removeClass('char').addClass(boardobj.currcolor).html(boardobj.currstep++);
			  boardobj.currcolor = (boardobj.currcolor == 'black' ? 'white':'black');
			  boardobj.currgame += nextstep;
			  if(boardobj.currgame == boardobj.gameinit && (! lib))
			  {
				  boardobj.show_char();
			  }
			  else
			  {
				  boardobj.hide_char();
			  }
			  return true;
		  }
		  else
		  {
			  return false;
		  }
	  };
	  this.next = function(){
		  boardobj.next_nolib();
		  boardobj.getlib();
	  };
	  //前一手
	  this.pre_nolib = function(){
		  if(boardobj.currgame != '')
		  {
			  currstep = boardobj.currgame.substr(boardobj.currgame.length-2,2);
			  currstepcell = boardobj.Boardview.find('.'+currstep);
			  currstepcell.removeClass('black white').addClass('blank').html('');
			  boardobj.currcolor = (boardobj.currcolor == 'black' ? 'white':'black');
			  boardobj.currgame = boardobj.currgame.substr(0,boardobj.currgame.length-2);
			  boardobj.currstep --;
			  if(boardobj.currgame == boardobj.gameinit && (! lib))
			  {
				  boardobj.show_char();
			  }
			  else
			  {
				  boardobj.hide_char();
			  }
			  return true;
		  }
		  else
		  {
			  return false;
		  }
	  };
	  this.pre = function() {
		  boardobj.pre_nolib();
		  boardobj.getlib();
	  };
	  //回到第一手
	  this.clean = function(){
		  while(boardobj.pre_nolib());
		  boardobj.getlib();
	  };
	  //到最后一手
	  this.end = function(){
		  while(boardobj.next_nolib());
		  boardobj.getlib();
	  };
	  
	  //显示备注字符
	  this.show_char = function(){
		  if(!boardobj.chars) return false;
		  for(var sub=0;sub< boardobj.chars.length;sub += 3)
		  {
			  var prime;
			  if(sub + 3 < boardobj.chars.length && boardobj.chars[sub + 3] == '\'') {
				prime = true;
				curr = boardobj.chars.substr(sub,4);
			  }
			  else {
				  prime = false;
				  curr = boardobj.chars.substr(sub,3);
			  }
			  point = curr.substr(0,2);
			  if(prime) {
				  char = curr.substr(2,2);
				  sub += 1;
			  }
			  else {
				char = curr.substr(2,1);
			  }
			  if(boardobj.Boardview.find('.'+point).hasClass('blank'))
			  {
				  boardobj.Boardview.find('.'+point).addClass('char').html(char);
			  }
		  }
	  };
	  //隐藏备注字符
	  this.hide_char = function(){
		  if(!boardobj.chars) return false;
		  boardobj.Boardview.find(".char").removeClass('char').html('');
	  };
	  //根据gameinit显示整盘棋
	  this.init = function(){
		  boardobj.endgame = boardobj.gameinit;
		  boardobj.currgame = '';
		  boardobj.currcolor = 'black';
		  boardobj.currstep = 1;
		  boardobj.Boardview.find('.row div').removeClass('black white').addClass('blank').html('');
		  boardobj.end();
	  };
	  //生成棋盘
	  for(i=15;i>0;i--)
	  {
		  //insert a row
		  newrow = $(document.createElement("div"));
		  newrow.addClass('row');
		  boardobj.Boardview.append(newrow);
		  for(j=1;j<=15;j++)
		  {
			  //insert a cross point
			  newcell = $(document.createElement("div"));
			  newcell.addClass(i.toString(16) + j.toString(16));
			  newcell.attr('alt',i.toString(16) + j.toString(16));
			  newcell.addClass('blank');
			  newrow.append(newcell);
		  }
	  }
	  //生成控制按钮
	  controlbar = $(document.createElement("div"));
	  controlbar.addClass('boardcontrolbar');
	  boardobj.Boardview.after(controlbar);
	  nextbtn = $(document.createElement("input"));
	  pre = $(document.createElement("input"));
	  end = $(document.createElement("input"));
	  init = $(document.createElement("input"));
	  first = $(document.createElement("input"));
	  first.attr('type','button').val('|<<第一手').click(boardobj.clean).appendTo(controlbar);
	  pre.attr('type','button').val('<前一手').click(boardobj.pre).appendTo(controlbar);
	  nextbtn.attr('type','button').val('后一手>').click(boardobj.next).appendTo(controlbar);
	  end.attr('type','button').val('最后>>|').click(boardobj.end).appendTo(controlbar);
	  init.attr('type','button').val('恢复').click(boardobj.init).appendTo(controlbar);
	  
	  boardobj.Boardview.find('.row div').click(function(){
		  //落子
		  if(!$(this).hasClass('blank'))
		  {
			  return false;
		  }
		  boardobj.hide_char();
		  $(this).removeClass('blank').addClass(boardobj.currcolor).html(boardobj.currstep++);
		  boardobj.currcolor = (boardobj.currcolor == 'black' ? 'white':'black');
		  boardobj.currgame += $(this).attr('alt');
		  boardobj.endgame = boardobj.currgame;
		  boardobj.getlib();
		  return true;
	  });
	  //恢复棋盘
	  this.init();
  }
  $(document).ready(function(){
	  $('.renjuboardbbcode').each(function(){
		  new board($(this));
	  });
  });
