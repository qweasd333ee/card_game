// 按下開始遊戲
$('#startBtn').on('click', function () {
  $('#home').hide()
  $('#game').show()
  resetCard()
  for (let i = 0; i < 18; i++) {
    $('#gameBox').append(`
    <div class="card card-close">
      <div class="card-front"></div>
      <div class="card-back"></div>
    </div>
  `)
  }
  for (let i = 0; i < $('.card').length; i++) {
    // 決定數字
    const num = i % ($('.card').length / 2)
    $('.card').eq(i).find('.card-front').css('background-image', `url(./images/${num}.jpg)`)
    $('.card').eq(i).attr('data-num', num)

    // 打散
    const target = Math.round(Math.random() * ($('.card').length - 1))
    $('.card').eq(target).insertAfter($('.card').eq(i))
  }
})

// 首頁按鈕
$('.backHome').on('click', function () {
  $('#game').hide()
  $('#tarot').hide()
  $('#home').show()
  resetCard()
})

// 重製遊戲區、塔羅抽取區卡牌
const resetCard = () => {
  $('#gameBox').html('')
  $('#tarotGameBox').html('')
  $('#tarotShow').html('')
}

$('#game').on('click', '.card', function () {
  // 最多一次翻兩張，牌還沒翻開
  if ($('.card:not(.card-close)').length < 2 && $(this).hasClass('card-close') && !$(this).hasClass('card-ok')) {
    $(this).removeClass('card-close')
  }

  // 如果翻兩張了
  if ($('.card:not(.card-close)').length === 2) {
    // 如果數字一樣
    if ($('.card:not(.card-close)').eq(0).attr('data-num') === $('.card:not(.card-close)').eq(1).attr('data-num')) {
      // 用 card-ok 標記已完成
      $('.card:not(.card-close)').addClass('card-ok')
      $('.card:not(.card-close)').fadeTo(1000, 0)
    }

    // 不管數字一不一樣都將卡片翻回來
    setTimeout(() => {
      $('.card:not(.card-close)').addClass('card-close')
      if ($('.card-ok').length === $('.card').length) {
        Swal.fire({
          icon: 'succedd',
          title: '恭喜',
          text: '恭喜過關'
        }).then(function () {
          resetCard()
          $('#game').hide()
          $('#home').show()
        });
      }
    }, 1000);
  }
})

// 塔羅抽牌區
$('#tarotBtn').on('click', function () {
  $('#home').hide()
  $('#tarot').show()
  // resetCard()
  const aaa = 4;
  for (let i = 0; i < 22; i++) {

    $('#tarotGameBox').append(`
    <div class="card card-close position" style="left: ${(i + 11) * 2}%;">
    <div class="card-back"></div>
    </div>
  `)

    const num = i % ($('.card').length)
    $('.card').eq(i).find('.card-front').css('background-image', `url(./images/${num}.jpg)`)
    $('.card').eq(i).attr('data-num', num)
  }
})



$('#selectCard').on('click', function () {
  $('#tarotShow').html('')
  for (let i = 0; i < 6; i++) {
    $('#tarotShow').append(`
    <div class="card">
      <div class="card-front"></div>
    </div>
  `)
  }
  for (let i = 22; i < 28; i++) {
    let card = getRandom(22)
    let info = ''
    if (card === info) {
      return
    } else {
      info = card
    }
    console.log(info)
    $('.card').eq(i).find('.card-front').css('background-image', `url(./images/${info}.jpg)`)
  }
})


// 隨機取數字
const getRandom = (max) => {
  return Math.floor(Math.random() * max);
}




document.onkeydown = (event) => {
  if (event.code === 'Space') {
    $('#home').hide();
    $('#game').hide();
    $('#tarot').show()
  }
};