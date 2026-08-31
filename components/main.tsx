
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

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

import { UserContext } from '@/context/context';


// =====================================================
// FEED CARD
// =====================================================

function FeedCard({ item }: { item: any }) {

  const [liked, setLiked] = useState(false);

  // Card scale
  const cardScale = useSharedValue(1);

  // Image scale
  const imageScale = useSharedValue(1);


  // ===================================================
  // CARD ANIMATION
  // ===================================================

  const cardAnimatedStyle = useAnimatedStyle(() => {

    return {
      transform: [
        {
          scale: cardScale.value,
        },
      ],
    };

  });


  // ===================================================
  // IMAGE ANIMATION
  // ===================================================

  const imageAnimatedStyle = useAnimatedStyle(() => {

    return {
      transform: [
        {
          scale: imageScale.value,
        },
      ],
    };

  });


  // ===================================================
  // CARD PRESS GESTURE
  // ===================================================

  const cardGesture = Gesture.Tap()

    .onBegin(() => {

      cardScale.value = withSpring(
        0.985,
        {
          damping: 15,
          stiffness: 300,
        }
      );

    })

    .onFinalize(() => {

      cardScale.value = withSpring(
        1,
        {
          damping: 12,
          stiffness: 250,
        }
      );

    });


  // ===================================================
  // IMAGE LONG PRESS
  // ===================================================

  const imageGesture = Gesture.LongPress()

    .minDuration(250)

    .onStart(() => {

      imageScale.value = withSpring(
        1.12,
        {
          damping: 12,
          stiffness: 180,
        }
      );

    })

    .onEnd(() => {

      imageScale.value = withTiming(
        1,
        {
          duration: 250,
        }
      );

    })

    .onFinalize(() => {

      imageScale.value = withTiming(
        1,
        {
          duration: 250,
        }
      );

    });


  // ===================================================
  // LIKE
  // ===================================================

  function handleLike() {

    setLiked((previous) => !previous);

  }


  // ===================================================
  // RETURN
  // ===================================================

  return (

    <GestureDetector gesture={cardGesture}>

      <Animated.View
        style={[
          styles.card,
          cardAnimatedStyle,
        ]}
      >

        {/* =========================================== */}
        {/* USER */}
        {/* =========================================== */}

        <View style={styles.userRow}>

          <Image
            source={{
              uri: item.user.avatar,
            }}
            style={styles.avatar}
          />

          <View style={styles.userInfo}>

            <Text style={styles.userName}>
              {item.user.name}
            </Text>

            <Text style={styles.time}>
              {new Date(
                item.timestamp
              ).toLocaleDateString()}
            </Text>

          </View>

          <Text style={styles.categoryLabel}>
            {item.category}
          </Text>

        </View>


        {/* =========================================== */}
        {/* CONTENT */}
        {/* =========================================== */}

        <Text style={styles.postContent}>
          {item.content}
        </Text>


        {/* =========================================== */}
        {/* IMAGE */}
        {/* =========================================== */}

        {item.image && (

          <GestureDetector
            gesture={imageGesture}
          >

            <Animated.View
              style={styles.imageWrapper}
            >

              <Animated.Image
                source={{
                  uri: item.image,
                }}
                style={[
                  styles.postImage,
                  imageAnimatedStyle,
                ]}
              />

            </Animated.View>

          </GestureDetector>

        )}


        {/* =========================================== */}
        {/* ACTIONS */}
        {/* =========================================== */}

        <View style={styles.actions}>

          {/* LIKE */}

          <Pressable
            style={styles.action}
            onPress={handleLike}
            hitSlop={10}
          >

            <Text style={styles.actionIcon}>
              {liked ? '❤️' : '♡'}
            </Text>

            <Text style={styles.actionText}>
              {liked
                ? item.likes + 1
                : item.likes}
            </Text>

          </Pressable>


          {/* COMMENTS */}

          <Pressable
            style={styles.action}
          >

            <Text style={styles.actionIcon}>
              ○
            </Text>

            <Text style={styles.actionText}>
              {item.comments}
            </Text>

          </Pressable>


          {/* SHARE */}

          <Pressable
            style={styles.share}
          >

            <Text style={styles.actionIcon}>
              ↗
            </Text>

          </Pressable>

        </View>

      </Animated.View>

    </GestureDetector>

  );
}


// =====================================================
// FEED
// =====================================================

export default function Feed() {

  const { users } = useContext(UserContext);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState('All');


  // ===================================================
  // CREATE FEED
  // ===================================================

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


  // ===================================================
  // CATEGORIES
  // ===================================================

  const categories = [

    'All',

    ...new Set(

      users.flatMap((user) =>

        user.feeds.map(
          (feed) => feed.category
        )

      )

    ),

  ];


  // ===================================================
  // FILTER
  // ===================================================

  const filteredFeeds =

    selectedCategory === 'All'

      ? allFeeds

      : allFeeds.filter(

          (feed) =>
            feed.category ===
            selectedCategory

        );


  // ===================================================
  // RETURN
  // ===================================================

  return (

    <View style={styles.container}>


      {/* ============================================= */}
      {/* HEADER */}
      {/* ============================================= */}

      <View style={styles.header}>

        <View style={styles.headerText}>

          <Text style={styles.smallTitle}>
            YOUR FEED
          </Text>

          <Text style={styles.title}>
            Discover
          </Text>

        </View>

      </View>


      {/* ============================================= */}
      {/* CATEGORIES */}
      {/* ============================================= */}

      <View
        style={styles.categorySection}
      >

        <Text style={styles.sectionTitle}>
          Categories
        </Text>


        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            styles.categoryList
          }
        >

          {categories.map((category) => {

            const active =
              selectedCategory ===
              category;


            return (

              <Pressable
                key={category}
                onPress={() =>
                  setSelectedCategory(
                    category
                  )
                }

                style={[
                  styles.category,

                  active &&
                    styles.categoryActive,
                ]}
              >

                <Text
                  style={[
                    styles.categoryText,

                    active &&
                      styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>

              </Pressable>

            );

          })}

        </ScrollView>

      </View>


      {/* ============================================= */}
      {/* FEED */}
      {/* ============================================= */}

      <FlatList

        data={filteredFeeds}

        keyExtractor={(item) =>
          item.id.toString()
        }

        showsVerticalScrollIndicator={false}

        contentContainerStyle={
          styles.feed
        }

        renderItem={({ item }) => (

          <FeedCard
            item={item}
          />

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


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  // ================================================
  // CONTAINER
  // ================================================

  container: {
    flex: 1,
    backgroundColor: '#050505',
  },


  // ================================================
  // HEADER
  // ================================================

  header: {
    paddingHorizontal: 22,

    marginTop: 50,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',
  },

  headerText: {},

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


  // ================================================
  // CATEGORIES
  // ================================================

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


  // ================================================
  // FEED
  // ================================================

  feed: {
    paddingHorizontal: 18,

    paddingTop: 12,

    paddingBottom: 30,
  },


  // ================================================
  // CARD
  // ================================================

  card: {
    backgroundColor: '#0d0d0d',

    borderRadius: 22,

    borderWidth: 1,

    borderColor: '#1d1d1d',

    padding: 16,

    marginBottom: 16,

    overflow: 'hidden',
  },


  // ================================================
  // USER
  // ================================================

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


  // ================================================
  // POST
  // ================================================

  postContent: {
    color: '#ddd',

    fontSize: 15,

    lineHeight: 22,

    marginTop: 15,

    marginBottom: 14,
  },


  // ================================================
  // IMAGE
  // ================================================

  imageWrapper: {
    width: '100%',

    height: 210,

    borderRadius: 16,

    overflow: 'hidden',
  },

  postImage: {
    width: '100%',

    height: '100%',

    borderRadius: 16,
  },


  // ================================================
  // ACTIONS
  // ================================================

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


  // ================================================
  // EMPTY
  // ================================================

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

