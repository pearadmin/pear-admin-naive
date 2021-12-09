<script setup lang="ts">
  import { addDays } from 'date-fns'
  const projectList = [
    {
      id: 1,
      title: '新月曲如眉',
      desc: '一江离愁泪东去，送别有青山',
      image: 'https://cdn.jsdelivr.net/gh/jiabinbin/cdn/images/background/other/bg004.jpeg'
    },
    {
      id: 2,
      title: '未有团圆意',
      desc: '碧月玲珑照人寰，忆当年，几多悲欢',
      image: 'https://cdn.jsdelivr.net/gh/jiabinbin/cdn/images/background/other/bg005.png'
    },
    {
      id: 3,
      desc: '云水深处斜阳影，草木天际黯',
      title: '红豆不堪看',
      image: 'https://cdn.jsdelivr.net/gh/jiabinbin/cdn/images/background/other/bg006.jpeg'
    },
    {
      id: 1,
      title: '满眼相思泪',
      desc: '孤鸿声断层云里，无处觅乡关',
      image: 'https://cdn.jsdelivr.net/gh/jiabinbin/cdn/images/background/other/bg007.jpeg'
    },
    {
      id: 1,
      title: '终日劈桃穰',
      desc: '干戈事，随惊涛万里',
      image: 'https://cdn.jsdelivr.net/gh/jiabinbin/cdn/images/background/other/bg008.webp'
    },
    {
      id: 1,
      title: '仁在心儿里',
      desc: '日落处，风流云散',
      image: 'https://cdn.jsdelivr.net/gh/jiabinbin/cdn/images/background/other/bg009.jpeg'
    },
    {
      id: 1,
      title: '两朵隔墙花',
      desc: '归去来也，黄粱梦醒',
      image: 'https://cdn.jsdelivr.net/gh/jiabinbin/cdn/images/background/other/bg003.jpeg'
    },
    {
      id: 1,
      title: '早晚成连理',
      desc: '枕边泪阑干。',
      image: 'https://cdn.jsdelivr.net/gh/jiabinbin/cdn/images/background/other/bg002.jpeg'
    }
  ]
</script>

<template>
  <PageWrapper :show-default-breadcrumb="false" :show-default-title="false">
    <template #pageHeaderContent>
      <NCard
        :bordered="false"
        content-style="display: flex; flex-direction: row; justify-content: flex-start;align-items: center;"
      >
        <div class="flex">
          <n-avatar round :size="72" src="https://www.yuexiaoya.cn/images/photo.jpg" />
        </div>
        <NCard :bordered="false" content-style="padding: 0" class="ml-6 justify-between w-auto">
          <n-h5 class="m-0">早安！ 落梅听风雪！</n-h5>
          <n-text>那日少年薄春衫，明月照银簪。</n-text>
        </NCard>
        <NSpace class="flex-1 mr-4" :wrap="false" justify="end">
          <NCard :bordered="false" content-style="padding: 0 40px">
            <n-statistic label="项目">1/10</n-statistic>
          </NCard>
          <NCard :bordered="false" content-style="padding: 0 40px">
            <n-statistic label="团队">1/1</n-statistic>
          </NCard>
          <NCard :bordered="false" content-style="padding: 0 40px">
            <n-statistic label="待办">3/10</n-statistic>
          </NCard>
        </NSpace>
      </NCard>
    </template>
    <NGrid :x-gap="6" :cols="2">
      <NGi>
        <NCard title="项目">
          <template #header-extra>
            <n-a>更多</n-a>
          </template>
          <NGrid cols="4">
            <NGi v-for="it in projectList" :key="it.id">
              <NCard hoverable content-style="padding: 10px" header-style="padding: 10px">
                <template #header>
                  <NGradientText type="info">
                    {{ it.title }}
                  </NGradientText>
                </template>
                <template #cover>
                  <img class="object-cover h-40" :src="it.image" />
                </template>
                <NText>{{ it.desc }}</NText>
              </NCard>
            </NGi>
          </NGrid>
        </NCard>
      </NGi>
      <NGi>
        <NCard title="日程">
          <NCalendar #="{ year, month, date }" :value="addDays(Date.now(), 1).valueOf()">
            {{ year }}-{{ month }}-{{ date }}
          </NCalendar>
        </NCard>
      </NGi>
      <NGi class="mt-2">
        <NCard title="最新动态">
          <template #header-extra>
            <n-a>更多</n-a>
          </template>
        </NCard>
      </NGi>
      <NGi class="mt-2">
        <NCard title="Hello Word"></NCard>
      </NGi>
    </NGrid>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
