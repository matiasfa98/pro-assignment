import { useContext, useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { UserContext } from '@/context/context';


export default function Feed() {
  const {users} = useContext(UserContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [like, setLike] = useState(false)
  
  function handellike(){
    setLike(prev=> !prev)
  }

  const allFeeds = users.flatMap((user) =>
    user.feeds.map((feed) => ({
      ...feed,
      user: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
    }))
  );
  const categories = [
  'All',
  ...new Set(
    users.flatMap((user) =>
      user.feeds.map((feed) => feed.category)
    )
  ),
];


  const filteredFeeds =
    selectedCategory === 'All'
      ? allFeeds
      : allFeeds.filter(
          (feed) => feed.category === selectedCategory
        );

  return (
    <View style={styles.container}>

      {/* TOP CONTENT */}
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.topContent}
      > */}
        <View style={styles.header}>
          <View style={{marginTop: 50}}>
            <Text style={styles.smallTitle}>YOUR FEED</Text>
            <Text style={styles.title}>Discover</Text>
          </View>

          {/* <View style={styles.notification}>
            <Text style={styles.notificationText}>3</Text>
          </View> */}
        </View>

        {/* CATEGORIES */}
        <View style={[styles.categorySection]}>
          <Text style={styles.sectionTitle}>Categories</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          >
            {categories.map((category) => {
              const active = selectedCategory === category;

              return (
                <Pressable
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={[
                    styles.category,
                    active && styles.categoryActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      active && styles.categoryTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      {/* </ScrollView> */}

      {/* FEED */}
      <FlatList
        data={filteredFeeds}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feed}
        renderItem={({ item }) => (
          <View style={styles.card}>

            {/* USER */}
            <View style={styles.userRow}>
              <Image
                source={{ uri: item.user.avatar }}
                style={styles.avatar}
              />

              <View style={styles.userInfo}>
                <Text style={styles.userName}>
                  {item.user.name}
                </Text>

                <Text style={styles.time}>
                  {new Date(item.timestamp).toLocaleDateString()}
                </Text>
              </View>

              <Text style={styles.categoryLabel}>
                {item.category}
              </Text>
            </View>

            {/* CONTENT */}
            <Text style={styles.postContent}>
              {item.content}
            </Text>

            {/* IMAGE */}
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={styles.postImage}
              />
            )}

            {/* ACTIONS */}
            <View style={styles.actions}>

              <Pressable style={styles.action} onPress={handellike}>
                <Text style={styles.actionIcon}>{like ? '❤️': '♡'}</Text>
                <Text style={styles.actionText}>
                  {like ? item.likes +1  : item.likes }
                </Text>
              </Pressable>

              <Pressable style={styles.action}>
                <Text style={styles.actionIcon}>○</Text>
                <Text style={styles.actionText}>
                  {item.comments}
                </Text>
              </Pressable>

              <Pressable style={styles.share}>
                <Text style={styles.actionIcon}>↗</Text>
              </Pressable>

            </View>

          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>
              Nothing here yet
            </Text>

            <Text style={styles.emptyText}>
              Try another category.
            </Text>
          </View>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },

  topContent: {
    paddingTop: 20,
  },

  header: {
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  smallTitle: {
    color: '#666',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
  },

  title: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 4,
  },

  notification: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#252525',
    alignItems: 'center',
    justifyContent: 'center',
  },

  notificationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },

  categorySection: {
    marginTop: 25,
  },

  sectionTitle: {
    color: '#999',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 22,
    marginBottom: 12,
  },

  categoryList: {
  paddingHorizontal: 22,
  gap: 10,
  flexGrow: 0,
},

  category: {
    paddingHorizontal: 18,
    height: 38,
    borderRadius: 20,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#222',
    justifyContent: 'center',
  },

  categoryActive: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },

  categoryText: {
    color: '#777',
    fontSize: 12,
    fontWeight: '700',
  },

  categoryTextActive: {
    color: '#050505',
  },

  feed: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#0d0d0d',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#1d1d1d',
    padding: 16,
    marginBottom: 16,
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 43,
    height: 43,
    borderRadius: 15,
  },

  userInfo: {
    marginLeft: 11,
    flex: 1,
  },

  userName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },

  time: {
    color: '#666',
    fontSize: 11,
    marginTop: 3,
  },

  categoryLabel: {
    color: '#777',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },

  postContent: {
    color: '#ddd',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 15,
    marginBottom: 14,
  },

  postImage: {
    width: '100%',
    height: 210,
    borderRadius: 16,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },

  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 22,
  },

  actionIcon: {
    color: '#aaa',
    fontSize: 20,
  },

  actionText: {
    color: '#777',
    fontSize: 12,
    marginLeft: 6,
  },

  share: {
    marginLeft: 'auto',
  },

  empty: {
    alignItems: 'center',
    paddingTop: 60,
  },

  emptyTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  emptyText: {
    color: '#666',
    marginTop: 6,
    fontSize: 13,
  },
});