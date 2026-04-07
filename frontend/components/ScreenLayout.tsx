import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface ScreenLayoutProps {
  title: string;
  subtitle?: string;

  loading?: boolean;
  loadingText?: string;

  empty?: boolean;
  emptyTitle?: string;
  emptySubtitle?: string;

  /**
   * replace  -> replaces children (default)
   * inline   -> shows empty state but keeps children
   */
  emptyMode?: 'replace' | 'inline';

  children?: React.ReactNode;
}

export default function ScreenLayout({
  title,
  subtitle,
  loading = false,
  loadingText,

  empty = false,
  emptyTitle,
  emptySubtitle,
  emptyMode = 'replace',

  children,
}: ScreenLayoutProps) {

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1F3D2B" />
        {loadingText && (
          <Text style={styles.loadingText}>{loadingText}</Text>
        )}
      </View>
    );
  }

  const showReplaceEmpty = empty && emptyMode === 'replace';
  const showInlineEmpty = empty && emptyMode === 'inline';

  return (
    <View style={styles.container}>

      {/* ---------- Header ---------- */}
      <View style={styles.header}>
        <Text style={styles.heading}>{title}</Text>
        {subtitle && (
          <Text style={styles.subHeading}>{subtitle}</Text>
        )}
      </View>

      {/* ---------- Replace Mode ---------- */}
      {showReplaceEmpty ? (
        <View style={styles.emptyBox}>
          {emptyTitle && (
            <Text style={styles.emptyTitle}>{emptyTitle}</Text>
          )}
          {emptySubtitle && (
            <Text style={styles.emptySubtitle}>
              {emptySubtitle}
            </Text>
          )}
        </View>
      ) : (
        <>
          {children}

          {/* ---------- Inline Mode ---------- */}
          {showInlineEmpty && (
            <View style={styles.inlineEmptyBox}>
              {emptyTitle && (
                <Text style={styles.emptyTitle}>{emptyTitle}</Text>
              )}
              {emptySubtitle && (
                <Text style={styles.emptySubtitle}>
                  {emptySubtitle}
                </Text>
              )}
            </View>
          )}
        </>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E8',
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  header: {
    marginBottom: 10,
  },

  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F3D2B',
  },

  subHeading: {
    marginTop: 4,
    fontSize: 13,
    color: '#6B7280',
  },

  emptyBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },

  inlineEmptyBox: {
    alignItems: 'center',
    marginTop: 40,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },

  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 6,
    textAlign: 'center',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F1E8',
  },

  loadingText: {
    marginTop: 10,
    color: '#6B7280',
    fontSize: 14,
  },
});