# Nuxt 4 Naming Conventions

## 📁 File & Folder Structure

### Pages (Auto-routing)
```
pages/
├── index.vue                    # /
├── about.vue                    # /about
├── users/
│   ├── index.vue               # /users
│   ├── [id].vue                # /users/:id
│   └── [id]/
│       └── edit.vue            # /users/:id/edit
└── blog/
    └── [...slug].vue           # /blog/* (catch-all)
```

**Rules:**
- `kebab-case` for files and folders
- `[param]` for dynamic parameters
- `[...slug]` for catch-all routes
- `index.vue` for folder root route

### Components
```
components/
├── ui/
│   ├── UiButton.vue            # <UiButton />
│   ├── UiInput.vue             # <UiInput />
│   └── UiModal.vue             # <UiModal />
├── layout/
│   ├── TheHeader.vue           # <TheHeader />
│   ├── TheSidebar.vue          # <TheSidebar />
│   └── TheFooter.vue           # <TheFooter />
├── user/
│   ├── UserCard.vue            # <UserCard />
│   ├── UserProfile.vue         # <UserProfile />
│   └── UserAvatar.vue          # <UserAvatar />
└── ProductList.vue             # <ProductList />
```

**Rules:**
- `PascalCase` for file names
- Prefix `The` for singleton components (header, footer)
- Prefix `Ui` or `Base` for base UI components
- Group by functionality in folders

### Composables
```
composables/
├── useAuth.ts                  # authentication
├── useFetch.ts                 # fetch wrapper
├── useLocalStorage.ts          # localStorage operations
├── useModal.ts                 # modals
└── user/
    ├── useUserProfile.ts       # user profile
    └── useUserSettings.ts      # settings
```

**Rules:**
- `camelCase` with `use` prefix
- One composable = one file
- Export via `export default function useName()`

### Stores (Pinia)
```
stores/
├── auth.ts                     # useAuthStore()
├── cart.ts                     # useCartStore()
├── user.ts                     # useUserStore()
└── products.ts                 # useProductsStore()
```

**Rules:**
- `camelCase` for files
- `defineStore('storeName', ...)` - kebab-case for ID
- Export: `export const useAuthStore = defineStore(...)`

### Utils & Helpers
```
utils/
├── formatters.ts               # formatPrice, formatDate
├── validators.ts               # validateEmail, validatePhone
├── api.ts                      # API helpers
└── constants.ts                # APP_NAME, API_URL
```

**Rules:**
- `camelCase` for files
- `camelCase` for functions
- `SCREAMING_SNAKE_CASE` for constants

---

## 💾 Pinia Store Conventions

### Store Structure
```typescript
export const useUserStore = defineStore('user', () => {
  // STATE - nouns in camelCase
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const users = ref<User[]>([])

  // GETTERS - nouns or is/has prefixes
  const fullName = computed(() =>
    user.value ? `${user.value.firstName} ${user.value.lastName}` : ''
  )
  const isAuthenticated = computed(() => !!user.value)
  const hasPermission = computed(() => (perm: string) =>
    user.value?.permissions.includes(perm)
  )

  // ACTIONS - verbs in camelCase
  async function fetchUser(id: string) {
    isLoading.value = true
    try {
      user.value = await $fetch(`/api/users/${id}`)
    } finally {
      isLoading.value = false
    }
  }

  function setUser(newUser: User) {
    user.value = newUser
  }

  function clearUser() {
    user.value = null
  }

  async function updateProfile(data: Partial<User>) {
    // ...
  }

  return {
    // state
    user,
    isLoading,
    users,
    // getters
    fullName,
    isAuthenticated,
    hasPermission,
    // actions
    fetchUser,
    setUser,
    clearUser,
    updateProfile
  }
})
```

### Action Naming Patterns
```typescript
// CRUD operations
fetchUsers()      // GET list
fetchUser(id)     // GET single
createUser(data)  // POST
updateUser(id, data)  // PUT/PATCH
deleteUser(id)    // DELETE

// Other operations
setUser()         // direct set
clearUser()       // clear
resetState()      // reset to default
toggleActive()    // toggle booleans
addToCart()       // add
removeFromCart()  // remove

// Async operations should clearly show what they do
async loadUserProfile()
async saveSettings()
async submitForm()
```

---

## 🔧 Composables Conventions

```typescript
// useAuth.ts
export default function useAuth() {
  // Local state - camelCase
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Methods - verbs
  async function login(credentials: Credentials) {
    // ...
  }

  async function logout() {
    // ...
  }

  function checkPermission(perm: string): boolean {
    // ...
  }

  // Return object with readonly for state
  return {
    isLoading: readonly(isLoading),
    error: readonly(error),
    login,
    logout,
    checkPermission
  }
}
```

---

## 📦 Variables & Constants

### Local Variables in Components
```typescript
// Reactive state - camelCase
const userName = ref('')
const isModalOpen = ref(false)
const selectedItems = ref<Item[]>([])

// Computed - nouns or is/has
const fullName = computed(() => `${firstName.value} ${lastName.value}`)
const isValid = computed(() => userName.value.length > 3)
const hasChanges = computed(() => /* ... */)

// Functions - verbs
function handleSubmit() {}
function onInputChange(value: string) {}
async function fetchData() {}
```

### Constants
```typescript
// Global constants - SCREAMING_SNAKE_CASE
export const API_BASE_URL = 'https://api.example.com'
export const MAX_FILE_SIZE = 5 * 1024 * 1024
export const DEFAULT_TIMEOUT = 30000

// Enum-like objects
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
} as const

// Config objects - camelCase
export const appConfig = {
  apiUrl: 'https://api.example.com',
  timeout: 30000,
  retries: 3
}
```

### Props & Emits
```typescript
// Props - camelCase
const props = defineProps<{
  userName: string
  isActive: boolean
  itemList: Item[]
  maxCount?: number
}>()

// Emits - kebab-case in template, camelCase in defineEmits
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit', data: FormData): void
  (e: 'close'): void
}>()

// Usage: @update:model-value, @submit, @close
```

---

## 🎯 TypeScript Types & Interfaces

```typescript
// Interfaces - PascalCase with I prefix (optional)
interface User {
  id: string
  name: string
  email: string
}

// Types - PascalCase
type UserRole = 'admin' | 'user' | 'guest'
type ApiResponse<T> = { data: T; error?: string }

// Enums - PascalCase
enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Banned = 'banned'
}

// Grouping in type files
// types/user.ts
export interface User { /* ... */ }
export interface UserProfile { /* ... */ }
export type UserRole = 'admin' | 'user'
```

---

## 📄 API & Server Routes

```
server/
├── api/
│   ├── users/
│   │   ├── index.get.ts        # GET /api/users
│   │   ├── index.post.ts       # POST /api/users
│   │   ├── [id].get.ts         # GET /api/users/:id
│   │   ├── [id].patch.ts       # PATCH /api/users/:id
│   │   └── [id].delete.ts      # DELETE /api/users/:id
│   └── auth/
│       ├── login.post.ts       # POST /api/auth/login
│       └── logout.post.ts      # POST /api/auth/logout
└── middleware/
    └── auth.ts
```

---

## 🎨 CSS/SCSS Classes

```vue
<template>
  <!-- BEM methodology or Tailwind -->

  <!-- BEM -->
  <div class="user-card">
    <div class="user-card__header">
      <h2 class="user-card__title">Title</h2>
    </div>
    <div class="user-card__body user-card__body--active">
      Content
    </div>
  </div>

  <!-- Utility-first (Tailwind) -->
  <div class="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
    <img class="w-12 h-12 rounded-full" :src="avatar" />
    <div class="flex-1">
      <h2 class="text-lg font-semibold">{{ name }}</h2>
    </div>
  </div>
</template>
```

---

## 🚀 Quick Reference

| Type | Convention | Example |
|------|-----------|---------|
| **Pages** | kebab-case | `user-profile.vue` |
| **Components** | PascalCase | `UserCard.vue` |
| **Composables** | camelCase + use | `useAuth.ts` |
| **Stores** | camelCase | `auth.ts` → `useAuthStore()` |
| **Variables** | camelCase | `userName`, `isActive` |
| **Constants** | SCREAMING_SNAKE_CASE | `API_URL`, `MAX_SIZE` |
| **Functions** | camelCase (verbs) | `fetchUser()`, `handleClick()` |
| **Types/Interfaces** | PascalCase | `User`, `ApiResponse` |
| **CSS classes** | kebab-case (BEM) | `user-card__title` |
| **Props** | camelCase | `userName`, `isActive` |
| **Events** | kebab-case | `@update:model-value` |

