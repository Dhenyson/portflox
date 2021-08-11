export default function menuSelectOptions() {
    const categoryOptions = [
        { value: 'All categories', text: 'All categories' },
        { value: 'work', text: 'Works' },
        { value: 'service', text: 'Services' },
        { value: 'study', text: 'Studies' },
        { value: 'annotation', text: 'Annotations' },
        { value: 'contribution', text: 'Contributions' },
        { value: 'blog', text: 'Blogs' }
    ]

    const tagsOptions = [
        { value: 'any', text: 'Any tag' },
        { value: 'all', text: 'All tags' }
    ]

    const orderByOption = [
        { value: 'updateDate', text: 'Update date' },
        { value: 'creationDate', text: 'Creation date' },
        { value: 'likes', text: 'Likes' },
        { value: 'comments', text: 'Comments' }
    ]

    const supportOptions = [
        { value: '', text: ' - Choose the type of support:' },
        { value: 'bug', text: 'Report a bug' },
        { value: 'problem', text: 'Problems on my account' },
        { value: 'others', text: 'Others' }
    ]

    const filterUsersOptions = [
        { value: 'stars', text: 'Stars' },
        { value: 'portfolios', text: 'Portfolios' }
    ]

    const filterSearchUserOptions = [
        { value: 'byName', text: 'By name' },
        { value: 'byKnowledge', text: 'By knowledge' }
    ]

    return {
        categoryOptions,
        tagsOptions,
        orderByOption,
        supportOptions,
        filterUsersOptions,
        filterSearchUserOptions
    }
}
